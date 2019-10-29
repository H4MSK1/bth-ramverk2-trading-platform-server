import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
import { CreateStockDTO, BuyOrSellStockDTO } from './stock.dto';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly repository: Repository<Stock>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Stock[]> {
    return this.repository.find({ relations: ['product'] });
  }

  async findById(id: number): Promise<Stock> {
    return this.repository.findOne(id);
  }

  async create(stockData: CreateStockDTO): Promise<Stock> {
    const model = new Stock();
    model.rate = stockData.rate;
    model.variance = stockData.variance;
    model.product = await this.productService.findById(stockData.productId);
    model.price = model.product.price;

    return this.repository.save(model);
  }

  async buyStocks(stockData: BuyOrSellStockDTO, userId: string) {
    const stock = await this.findById(stockData.stockId);
    return this.userService.buyUserStocks(stock, userId, stockData.amount);
  }

  async sellStocks(stockData: BuyOrSellStockDTO, userId: string) {
    return this.userService.sellUserStocks(
      userId,
      stockData.stockId,
      stockData.amount,
    );
  }

  async updatePrices() {
    return this.productService.randomPriceUpdate();
  }
}
