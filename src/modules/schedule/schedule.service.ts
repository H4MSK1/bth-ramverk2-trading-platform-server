import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { StockGateway } from '../stock/stock.gateway';

@Injectable()
export class ScheduleService extends NestSchedule {
  constructor(private readonly stockGateway: StockGateway) {
    super();
  }

  @Cron('*/15 * * * * *')
  async cronJob() {
    console.time('executing cron job');
    await this.stockGateway.broadcastStocks();
    console.timeEnd('executing cron job');
  }
}
