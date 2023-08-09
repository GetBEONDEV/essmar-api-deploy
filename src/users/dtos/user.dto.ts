import {
  IsString,
  IsNotEmpty,
  Length,
  IsPositive,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'the phone of user' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  @ApiProperty()
  identification: string;

  @IsNotEmpty()
  @ApiProperty()
  role: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
