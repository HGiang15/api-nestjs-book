import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'jwt_token_here', description: 'JWT access token' })
  token: string;
}
