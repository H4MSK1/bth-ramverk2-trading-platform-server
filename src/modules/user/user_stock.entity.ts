import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Stock } from '../stock/stock.entity';

@Entity()
export class UserStock {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'real' })
  price_when_purchased: number;

  @ManyToOne(type => Stock, { eager: true })
  stock: Stock;

  @ManyToOne(type => User, user => user.stocks, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(stock: Stock, amount: number, stockPrice: number) {
    this.stock = stock;
    this.amount = amount;
    this.price_when_purchased = stockPrice;
  }
}
