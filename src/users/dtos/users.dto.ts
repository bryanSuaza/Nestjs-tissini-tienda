import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class createUsersDto {
  @IsString()
  @ApiProperty({ description: 'Este es el nombre del usuario' })
  readonly name: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}

export class updateUsersDto extends PartialType(createUsersDto) {}
