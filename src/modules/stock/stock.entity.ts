import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  getRepository,
  AfterUpdate,
  AfterLoad,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { roundNumber } from '../../components/utils';
import { StockHistory } from './history.entity';

@Entity()
export class Stock {
  private price_old: number;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'real', default: 1.005 })
  rate: number;

  @Column({ type: 'real', default: 0.6 })
  variance: number;

  @Column({ type: 'real' })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(_type => Product, product => product.stocks, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  product: Product;

  @OneToMany(_type => StockHistory, history => history.stock, {
    eager: true,
    cascade: ['remove'],
  })
  history: StockHistory[];

  name: string;

  @BeforeInsert()
  @BeforeUpdate()
  async calculateStockPrice() {
    this.price = roundNumber(this.price * this.rate + this.variance);
  }

  @AfterUpdate()
  async createStockHistoryLog() {
    const model = new StockHistory(this.price_old, this.price, this);
    await getRepository(StockHistory).save(model);
  }

  preserveCurrentPrice() {
    this.price_old = this.price;
  }

  @AfterLoad()
  stockName() {
    this.name = this.product.title;
  }
}
