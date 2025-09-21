import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import { ListBookDto } from './dto/list-book.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(request: ListBookDto): Promise<any> {
    const { page, pageSize, keyword } = request;
    const query: any = {};

    if (keyword) query.$or = [{ title: { $regex: keyword, $options: 'i' } }];
    const [items, total] = await Promise.all([
      this.bookModel.aggregate([
        {
          $match: query,
        },
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * pageSize },
        { $limit: pageSize },
        {
          $project: {
            _id: 1,
            title: 1,
            author: 1,
            price: 1,
            category: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]),

      this.bookModel.countDocuments(query),
    ]);

    return {
      items,
      pagination: {
        total: total,
        currentPage: page,
      },
    };
  }

  async create(book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });

    const res = await this.bookModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id!');
    }

    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found!');
    }

    return book;
  }

  async updateById(book: UpdateBookDto): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(book._id, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
