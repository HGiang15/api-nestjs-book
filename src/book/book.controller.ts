import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ListBookDto } from './dto/list-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { BookResponseDto } from './dto/book-response.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post('get-page-list')
  @ApiResponse({ status: 200, type: [BookResponseDto] })
  @Roles(Role.Moderator, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllBooks(@Body() request: ListBookDto): Promise<Book[]> {
    return this.bookService.findAll(request);
  }

  @Post('create')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: BookResponseDto })
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  @Get('get-detail/:id')
  @ApiResponse({ status: 200, type: BookResponseDto })
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    const book = this.bookService.findById(id);
    return book;
  }

  @Post('update')
  @ApiResponse({ status: 200, type: BookResponseDto })
  async updateBook(
    @Body()
    book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(book);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
