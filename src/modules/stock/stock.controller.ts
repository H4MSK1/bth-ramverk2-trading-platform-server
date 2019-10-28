import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { AuthGuard } from '@nestjs/passport';
import { BuyOrSellStockDTO } from './stock.dto';
import { User } from '../user/user.decorator';
import { StockGateway } from './stock.gateway';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('stock')
@ApiBearerAuth()
@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly stockGateway: StockGateway,
  ) {}

  @Get('/')
  async root() {
    return this.stockService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/buy')
  async buyStocks(
    @User('userId') userId: string,
    @Body() params: BuyOrSellStockDTO,
  ) {
    return await this.stockService.buyStocks(params, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/sell')
  async sellStocks(
    @User('userId') userId: string,
    @Body() params: BuyOrSellStockDTO,
  ) {
    return await this.stockService.sellStocks(params, userId);
  }

  @Get('/update')
  async updatePrices() {
    return await this.stockGateway.broadcastStocks();
  }
}
