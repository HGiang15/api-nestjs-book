import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Gender } from '../enums/author.enum';

export class CreateAuthorDto {
  @ApiProperty({ example: 'string' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ enum: Gender, example: Gender.Male })
  @IsEnum(Gender)
  @IsOptional()
  readonly gender?: Gender;

  @ApiProperty({ example: 'ronaldo@example.com' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  readonly bio?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  readonly birthDate?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  readonly isActive?: boolean;
}
