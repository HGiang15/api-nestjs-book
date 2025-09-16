// import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../schemas/book.schema';

export class CreateBookDto {
  //   @IsString()
  //   @IsNotEmpty()
  readonly title: string;

  readonly description: string;

  //   @IsNotEmpty()
  readonly author: string;

  //   @IsNotEmpty()
  readonly price: number;

  //   @IsEnum(['ADVENTURE', 'CLASSICS', 'CRIME', 'FANTASY'], {
  //     message: 'Valid category required',
  //   })
  readonly category: Category;
}
