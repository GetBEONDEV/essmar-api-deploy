import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controller/users/users.controller';
import { CostumersController } from './controller/costumers/costumers.controller';
import { Customer } from './entities/customer.entity';

import { UserService } from './services/user.service';
import { User } from './entities/user.entity';

import { CustomerService } from './services/cuaromer.service';
import { Poliza } from './entities/poliza.entity';
import { ProfileController } from './controller/profile/profile.controller';
import { PolizaService } from './services/poliza.service';
import { Transaction } from './entities/transaction.entity';
import { ProfileService } from './services/profile.service';
import { TransactionSuccess } from './entities/transaction_success.entity';
import { TransactionRejected } from './entities/transaction_rejected.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Customer,
      Poliza,
      Transaction,
      TransactionSuccess,
      TransactionRejected,
    ]),
  ],
  controllers: [UsersController, CostumersController, ProfileController],
  providers: [UserService, CustomerService, PolizaService, ProfileService],
  exports: [UserService, TypeOrmModule],
})
export class UsersModule {}
