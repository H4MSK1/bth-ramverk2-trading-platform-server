import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import { UserStock } from './user_stock.entity';
import { HashFactory } from '../../components/hash.factory';
import { roundNumber } from '../../components/utils';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'real', default: 0, nullable: true })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(type => UserStock, stock => stock.user, {
    cascade: true,
  })
  stocks: UserStock[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await HashFactory(this.password).generateHash();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async fixBalance() {
    this.balance = roundNumber(this.balance);
  }
}
