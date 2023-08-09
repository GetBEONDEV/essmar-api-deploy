import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { User } from 'src/users/entities/user.entity';
import { CreateCustomerDto } from 'src/users/dtos/customer.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    const data = {
      name: user.customer.name,
      lastName: user.customer.lastName,
      email: user.customer.email,
      poliza: user.customer.polizas[0]['name'],
      terms: user.customer.terms,
      user: {
        phone: user.phone,
        identification: user.identification,
        role: 'customer',
      },
    } as CreateCustomerDto;
    return this.authService.loginUser(data, user);
  }

  @Post('register')
  register(@Body() body: CreateCustomerDto): any {
    return this.authService.registerUser(body);
  }
}
