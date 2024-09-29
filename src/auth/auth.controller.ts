import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

import { Role } from './types';
import { Auth } from './decorators/auth';

interface RequestWithUser extends Request {
  user: { email: string; role: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.ADMIN)
  profile(@Request() req: RequestWithUser) {
    return req.user;
  }
}
