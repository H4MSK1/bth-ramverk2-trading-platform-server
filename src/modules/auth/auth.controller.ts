import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/user.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async login(@Body() params: AuthDTO) {
    return this.authService.authenticate(params);
  }

  @Post('/register')
  async register(@Body() params: CreateUserDTO) {
    try {
      await this.userService.create(params);
      const { email: username, password } = params;
      return this.authService.authenticate({ username, password });
    } catch {
      throw new UnprocessableEntityException();
    }
  }
}
