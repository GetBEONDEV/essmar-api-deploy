import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsOptional,
  IsEmail,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  email: string;

  @IsPositive()
  @IsNotEmpty()
  poliza: number;

  @IsBoolean()
  @IsNotEmpty()
  terms: boolean;

  @IsOptional()
  @ApiProperty()
  user: CreateUserDto;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
