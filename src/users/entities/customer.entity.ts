import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { User } from './user.entity';
import { Poliza } from './poliza.entity';
import { Transaction } from './transaction.entity';
import { TransactionSuccess } from './transaction_success.entity';
import { TransactionRejected } from './transaction_rejected.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column()
  terms: boolean;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Poliza, (poliza) => poliza.customer)
  polizas: Poliza[];

  @OneToMany(() => Transaction, (transaction) => transaction.customer)
  transactions: Transaction[];

  @OneToMany(
    () => TransactionSuccess,
    (transaction_success) => transaction_success.customer,
  )
  transactions_success: TransactionSuccess[];

  @OneToMany(
    () => TransactionRejected,
    (transaction_rejected) => transaction_rejected.customer,
  )
  transactions_rejected: TransactionRejected[];
}
