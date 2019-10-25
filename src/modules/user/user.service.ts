import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './user.dto';
import { omit } from '../../components/utils';
import { UserStock } from './user_stock.entity';
import { Stock } from '../stock/stock.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(UserStock)
    private readonly userStockRepository: Repository<UserStock>,
  ) {}

  async findAll(): Promise<User[]> {
    const result: User[] = await this.repository.find();
    return result.map(user => omit(user, 'password'));
  }

  async findByUserId(userId: string): Promise<User> {
    const result: User = await this.repository.findOne(userId);
    return omit(result, 'password');
  }

  async findOneByEmail(email: string): Promise<User> {
    const result: User = await this.repository.findOne({ where: { email } });
    return omit(result, 'password');
  }

  async findOneByEmailWithPassword(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email } });
  }

  async create(userData: CreateUserDTO): Promise<User> {
    const model = new User();
    model.email = userData.email;
    model.password = userData.password;
    model.first_name = userData.first_name;
    model.last_name = userData.last_name;

    const user = await this.repository.save(model);
    return omit(user, 'password');
  }

  async buyUserStocks(stock: Stock, userId: string, amount: number) {
    const user = await this.findByUserId(userId);
    console.log('TCL: UserService -> buyUserStocks -> stock', stock);
    const totalPrice = stock.price * amount;
    if (totalPrice > user.balance) {
      throw new UnprocessableEntityException('Insufficient funds');
    }

    let updatedExisting = false;
    for (let i = 0; i < user.stocks.length; i++) {
      if (user.stocks[i].stock.id === stock.id) {
        user.stocks[i].amount += amount;
        updatedExisting = true;
        break;
      }
    }

    if (!updatedExisting) {
      user.stocks.push(new UserStock(stock, amount, stock.price));
    }

    user.balance -= totalPrice;
    return await this.repository.save(user);
  }

  async sellUserStocks(userId: string, userStockId: number, amount: number) {
    let userStock: UserStock = await this.userStockRepository.findOneOrFail(
      userStockId,
      { relations: ['user'] },
    );

    if (userStock.user.userId !== userId) {
      throw new UnauthorizedException();
    }

    if (amount > userStock.amount) {
      throw new UnprocessableEntityException();
    }

    userStock.user.balance += userStock.stock.price * amount;
    await this.repository.save(userStock.user);

    if (amount < userStock.amount) {
      userStock.amount -= amount;
    } else {
      return await this.userStockRepository.remove(userStock);
    }

    return await this.userStockRepository.save(userStock);
  }

  async addBalance(userId: string, balance: number): Promise<number> {
    const user = await this.findByUserId(userId);
    user.balance += balance;
    const updatedUser = await this.repository.save(user);
    return updatedUser.balance;
  }

  async getCurrentStocksValue(userId: string) {
    let stocksValue: number = 0;
    const user = await this.findByUserId(userId);

    if (user.stocks) {
      user.stocks.forEach(userStock => {
        stocksValue += userStock.stock.price * userStock.amount;
      });
    }

    return stocksValue;
  }
}
