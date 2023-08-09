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

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  bankId: string;

  @IsString()
  @IsNotEmpty()
  refPayment: string;

  @IsString()
  @IsNotEmpty()
  paymentDate: string;
}

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}
