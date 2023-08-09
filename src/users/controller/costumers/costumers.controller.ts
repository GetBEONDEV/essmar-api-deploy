import { CustomerService } from 'src/users/services/cuaromer.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  // ParseIntPipe,
} from '@nestjs/common';

import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CostumersController {
  constructor(private customerService: CustomerService) {}

  @ApiOperation({ summary: 'Obtener lista de Customers.' })
  @Get('all')
  getAll() {
    return this.customerService.findAll();
  }

  @Get(':costumerId')
  @HttpCode(HttpStatus.ACCEPTED)
  getCustomer(@Param('costumerId', ParseIntPipe) costumerId: number) {
    return this.customerService.findOne(costumerId);
  }

  @Post('customer')
  createCustomer(@Body() body: CreateCustomerDto): any {
    return this.customerService.create(body);
  }

  @Put('customer/update/:costumerId')
  updateCustomer(
    @Param('costumerId', ParseIntPipe) costumerId: number,
    @Body() body: UpdateCustomerDto,
  ): any {
    return this.customerService.update(costumerId, body);
  }

  @Delete('customer/:costumerId')
  deleteCustomer(@Param('costumerId', ParseIntPipe) costumerId: number): any {
    return this.customerService.remove(costumerId);
  }
}
