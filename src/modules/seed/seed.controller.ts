import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { StockGateway } from '../stock/stock.gateway';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('seed')
@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
    private readonly stockGateway: StockGateway,
  ) {}

  @Get('/')
  async root() {
    await this.seedService.generateSeed();
    await this.stockGateway.broadcastStocks(false);
    return { completed: true };
  }
}
