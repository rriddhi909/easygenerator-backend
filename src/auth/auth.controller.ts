import { AuthService } from './auth.service';
import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from 'src/auth/register-user.dto';
import { LoginUserDto } from './login-user.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post(`/login`)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Post('register')
  registerUser(@Body() createUserDto: RegisterUserDto) {
    return this.authService.registerUser(createUserDto);
  }
}
