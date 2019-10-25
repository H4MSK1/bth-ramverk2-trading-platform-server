import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './auth.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { HashFactory } from '../../components/hash.factory';
import { omit } from '../../components/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(credentials: AuthDTO) {
    const hasher = HashFactory(credentials.password);
    const user: User = await this.userService.findOneByEmailWithPassword(
      credentials.username,
    );

    if (user && (await hasher.compareHash(user.password))) {
      return await this.signToken(omit(user, 'password'));
    }

    throw new BadRequestException('Invalid credentials');
  }

  async signToken(user: User): Promise<string> {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      userId: user.userId,
    };

    return await this.jwtService.signAsync(payload);
  }

  async validateUser(payload: any): Promise<User> {
    const user = await this.userService.findByUserId(payload.userId);
    return user;
  }
}
