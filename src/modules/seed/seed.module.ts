import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [UserModule, ProductModule, StockModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
