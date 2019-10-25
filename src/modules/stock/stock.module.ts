import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';
import { StockController } from './stock.controller';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { StockGateway } from './stock.gateway';

@Module({
  imports: [ProductModule, UserModule, TypeOrmModule.forFeature([Stock])],
  controllers: [StockController],
  providers: [StockService, StockGateway],
  exports: [StockService, StockGateway],
})
export class StockModule {}
