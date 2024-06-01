import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Gender } from 'src/schemas/Profile.schema';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  displayName?: string; // display name

  @ApiProperty()
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ description: 'format DD-MM-YYYY' })
  @IsOptional()
  birthday?: string;

  @ApiProperty()
  @IsOptional()
  weight?: string;

  @ApiProperty()
  @IsOptional()
  height?: string;

  @ApiProperty()
  @IsOptional()
  interest?: string[];
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
