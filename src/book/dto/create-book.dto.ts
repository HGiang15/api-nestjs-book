import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/book.schema';
import { User } from 'src/auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Lập trình NestJS', description: 'Tiêu đề sách' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Giới thiệu NestJS', required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ example: 'Giang Hoàng' })
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty({ example: 150000, description: 'Giá sách' })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ enum: Category, example: Category.ADVENTURE })
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot pass user id!' })
  readonly user: User;
}
