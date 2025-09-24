import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../enums/book.enum';

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
  @IsMongoId()
  readonly authorId: string;

  @ApiProperty({ example: 150000, description: 'Giá sách' })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    example: ['https://example.com/1.jpg', 'https://example.com/2.jpg'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // mỗi phần tử trong array phải là string
  readonly images?: string[];

  @ApiProperty({ enum: Category, example: Category.ADVENTURE })
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot pass user id!' })
  readonly user: User;
}
