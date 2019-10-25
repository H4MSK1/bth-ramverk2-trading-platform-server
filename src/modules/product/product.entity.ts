import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from 'typeorm';
import { Stock } from '../stock/stock.entity';
import { roundNumber } from '../../components/utils';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column({ default: 'No description provided' })
  description: string;

  @Column({ default: 'no-image.png' })
  image: string;

  @Column({ type: 'real' })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(type => Stock, stock => stock.product, {
    cascade: ['remove', 'update'],
  })
  stocks: Stock;

  @BeforeInsert()
  @BeforeUpdate()
  async fixProductPrice() {
    this.price = roundNumber(this.price);
  }
}
