import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums/author.enum';

export class AuthorResponse {
  @ApiProperty({ example: '68d24c1fce02ad3f242748f9' })
  readonly _id: string;

  @ApiProperty({ example: 'Ronaldo' })
  readonly name: string;

  @ApiProperty({ enum: Gender, example: Gender.Male })
  readonly gender: Gender;

  @ApiProperty({ example: 'ronaldo@example.com' })
  readonly email: string;

  @ApiProperty({
    example: 'Portugal author, best known for the Football WC series',
  })
  readonly bio: string;

  @ApiProperty({ example: true })
  readonly isActive: boolean;
}

export class AuthorResponseWrapper {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({ type: AuthorResponse })
  data: AuthorResponse;
}

export class AuthorListResponseWrapper {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({ type: [AuthorResponse] })
  data: AuthorResponse[];
}

export class SuccessResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Xóa thành công' })
  message: string;
}
