import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBookDto } from './create-book.dto';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    example: '650f07d181e3b8c8fa7f5e22',
  })
  @IsNotEmpty()
  @IsString()
  @IsObjectId({ message: 'Id not valid!' })
  _id: string;
}
