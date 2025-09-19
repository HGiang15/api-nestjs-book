import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBookDto } from './create-book.dto';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsNotEmpty()
  @IsString()
  @IsObjectId({ message: 'Id not valid!' })
  _id: string;
}
