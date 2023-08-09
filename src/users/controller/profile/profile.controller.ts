import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PayloadToken } from 'src/auth/models/token.model';
import { Request } from 'express';
import { CreatePolizaDto } from 'src/users/dtos/poliza.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { PolizaService } from 'src/users/services/poliza.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateTransactionDto } from 'src/users/dtos/transaction.dto';
import { ProfileService } from 'src/users/services/profile.service';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private polizaService: PolizaService,
    private profileService: ProfileService,
  ) {}

  @Post('poliza')
  postPoliza(@Req() req: Request, @Body() body: CreatePolizaDto) {
    const user = req.user as PayloadToken;

    return this.polizaService.create(body, user.sub);
  }

  @Get('poliza')
  getPolizas(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.polizaService.polizasByCustomer(user.sub);
  }

  @Delete('poliza/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.polizaService.remove(id);
  }

  @Post('transaction')
  postTransaction(@Req() req: Request, @Body() body: CreateTransactionDto) {
    const user = req.user as PayloadToken;
    return this.profileService.createTransaction(body, user.sub);
  }

  @Get('transactions')
  getTransactions(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.profileService.getTransactions(user.sub);
  }

  @Get('transactions/status')
  getTransactionsStatus(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.profileService.getTransactionsStatus(user.sub);
  }
}
