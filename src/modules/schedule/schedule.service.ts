import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { StockGateway } from '../stock/stock.gateway';
import { SeedService } from '../seed/seed.service';

@Injectable()
export class ScheduleService extends NestSchedule {
  constructor(
    private readonly stockGateway: StockGateway,
    private readonly seedService: SeedService,
  ) {
    super();
  }

  @Cron('*/15 * * * * *')
  async cronJob() {
    console.time('executing cron job');
    await this.stockGateway.broadcastStocks();
    console.timeEnd('executing cron job');
  }

  @Cron('0 1 * * *')
  async resetDatabase() {
    console.time('executing cron job DB cleanup');
    await this.seedService.generateSeed();
    console.timeEnd('executing cron job DB cleanup');
  }
}
