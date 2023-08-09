import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'phone', passwordField: 'identification' });
  }

  async validate(phone: string, identification: string) {
    const user = await this.authService.validateUser(phone, identification);
    if (!user) {
      throw new UnauthorizedException('not allow');
    }
    return user;
  }
}
