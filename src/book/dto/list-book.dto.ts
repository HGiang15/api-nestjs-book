import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListBookDto {
  @ApiProperty({ example: 1, description: 'Trang hiện tại' })
  @IsNumber()
  page: number;

  @ApiProperty({ example: 10, description: 'Số phần tử mỗi trang' })
  @IsNumber()
  pageSize: number;

  @ApiProperty({
    example: 'Harry Potter',
    description: 'Từ khóa tìm kiếm',
    required: false,
  })
  @IsString()
  @IsOptional()
  keyword: string;
}
