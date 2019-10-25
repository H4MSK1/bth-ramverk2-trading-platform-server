import { Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { StockService } from '../stock/stock.service';
import { UserService } from '../user/user.service';
import { CreateProductDTO } from '../product/product.dto';
import { CreateStockDTO } from '../stock/stock.dto';
import { CreateUserDTO } from '../user/user.dto';
import { getConnection } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductService,
    private readonly stockService: StockService,
    private readonly userService: UserService,
  ) {}

  async generateSeed(): Promise<void> {
    console.time('Generating seeds...');
    await this.resetAndSync();
    await this.seedUsers();
    await this.seedProducts();
    await this.seedStocks();
    console.timeEnd('Generating seeds...');
  }

  private async resetAndSync(): Promise<void> {
    await getConnection().synchronize(true);
  }

  private async seedProducts(): Promise<void> {
    for (const name of ['Tesla Inc', 'Volvo', 'Ferrari N.V', 'Volkswagen']) {
      const seed: CreateProductDTO = {
        title: name,
        price: Math.floor(Math.random() * 350) + 200,
      };
      await this.productService.create(seed);
    }
  }

  private async seedStocks() {
    const products = await this.productService.findAll();
    for (let i = 0; i < products.length; i++) {
      const seed: CreateStockDTO = {
        productId: products[i].id,
        rate: 1.006,
        variance: parseFloat((Math.random() * 0.9 + 0.1).toFixed(2)),
      };
      await this.stockService.create(seed);
    }
  }

  private async seedUsers() {
    for (const letter of ['jsramverk', 'test']) {
      const seed: CreateUserDTO = {
        email: `${letter}@${letter}.${letter}`,
        password: letter,
        first_name: letter,
        last_name: 'Doe',
      };
      await this.userService.create(seed);
    }
  }
}
