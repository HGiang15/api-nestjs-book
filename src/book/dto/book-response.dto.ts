import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../enums/book.enum';

export class BookResponseDto {
  @ApiProperty({
    example: '68d01b861f28778155a3dc48',
    description: 'ID của sách',
  })
  readonly _id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly author: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty({ enum: Category })
  readonly category: Category;

  @ApiProperty({ example: '66f2bca9001', description: 'ID user tạo sách' })
  readonly user: string;

  @ApiProperty({ example: 'https://example.com/book.jpg' })
  readonly image: string;

  @ApiProperty({ example: '2025-09-21T12:00:00Z' })
  readonly createdAt: Date;

  @ApiProperty({ example: '2025-09-21T12:30:00Z' })
  readonly updatedAt: Date;
}
