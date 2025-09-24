import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthGuard } from '@nestjs/passport';
import { Author } from './schemas/author.schema';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthorListResponseWrapper,
  AuthorResponseWrapper,
  SuccessResponse,
} from './dto/author.response';

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('get-page-list')
  @ApiOkResponse({
    description: 'Danh sách tác giả',
    type: AuthorListResponseWrapper,
  })
  findAll() {
    return this.authorService.findAll();
  }

  @Post('create')
  @UseGuards(AuthGuard())
  @ApiCreatedResponse({
    description: 'Tạo tác giả thành công',
    type: AuthorResponseWrapper,
  })
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }

  @Get('get-detail/:id')
  @ApiOkResponse({
    description: 'Chi tiết tác giả',
    type: AuthorResponseWrapper,
  })
  @ApiNotFoundResponse({ description: 'Author not found' })
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Put('update/:id')
  @ApiOkResponse({
    description: 'Cập nhật tác giả thành công',
    type: AuthorResponseWrapper,
  })
  @ApiNotFoundResponse({ description: 'Author not found' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete('delete/:id')
  @ApiOkResponse({
    description: 'Xóa tác giả thành công',
    type: SuccessResponse,
  })
  @ApiNotFoundResponse({ description: 'Author not found' })
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
