import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from 'nest-schedule';
import { StockModule } from '../stock/stock.module';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [StockModule, NestScheduleModule.register()],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
