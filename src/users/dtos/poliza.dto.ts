import { IsString, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreatePolizaDto {
  @IsPositive()
  @IsNotEmpty()
  readonly poliza: number;
}

export class UpdatePolizaDto extends PartialType(CreatePolizaDto) {}
