import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ListBookDto {
  @IsNumber()
  page: number;

  @IsNumber()
  pageSize: number;

  @IsString()
  @IsOptional()
  keyword: string;
}
