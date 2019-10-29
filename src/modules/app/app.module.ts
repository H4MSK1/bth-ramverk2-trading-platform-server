import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TransformInterceptor } from '../../components/transform.interceptor';
import { ProductModule } from '../product/product.module';
import { StockModule } from '../stock/stock.module';
import { SeedModule } from '../seed/seed.module';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ProductModule,
    StockModule,
    SeedModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
