import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/apikey/apikey.guard';

import { Public } from './auth/decorators/public/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('nuevo') // 👈 Without slashes
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/') // 👈 With slashes
  hello() {
    return 'con /sas/';
  }
}
