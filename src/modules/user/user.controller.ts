import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { roundNumber } from '../../components/utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async root() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/balance')
  async getCurrentBalance(@User() user: any) {
    return roundNumber(user.balance);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/balance')
  async addBalance(
    @User('userId') userId: any,
    @Body('balance') balance: number,
  ) {
    return this.userService.addBalance(userId, balance);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/stocks')
  async getUserStocks(@User('userId') userId: string) {
    const user = await this.userService.findByUserId(userId);
    return user.stocks;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/stocks/value')
  async getUserStocksValue(@User('userId') userId: string) {
    const stockValue = await this.userService.getCurrentStocksValue(userId);
    return roundNumber(stockValue);
  }
}
