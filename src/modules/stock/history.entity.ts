import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Stock } from './stock.entity';

@Entity()
export class StockHistory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'real' })
  price_old: number;

  @Column({ type: 'real' })
  price_new: number;

  @ManyToOne(type => Stock, stock => stock.history, {
    onDelete: 'CASCADE',
  })
  stock: Stock;

  @CreateDateColumn()
  createdAt: Date;

  constructor(price_old: number, price_new: number, stock: Stock) {
    this.price_old = price_old;
    this.price_new = price_new;
    this.stock = stock;
  }
}
