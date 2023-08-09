import { Injectable } from '@nestjs/common';
import { CustomerService } from './cuaromer.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import { TransactionSuccess } from '../entities/transaction_success.entity';
import { TransactionRejected } from '../entities/transaction_rejected.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(TransactionSuccess)
    private transactionSuccessRepo: Repository<TransactionSuccess>,
    @InjectRepository(TransactionRejected)
    private transactionRejectedRepo: Repository<TransactionRejected>,
    private customerService: CustomerService,
  ) {}

  async createTransaction(data: CreateTransactionDto, userId: number) {
    const customer = await this.customerService.findOne(userId);
    const transaction = new Transaction();
    transaction.transactionId = data.transactionId;
    transaction.name = data.name;
    transaction.amount = data.amount;
    transaction.bankId = data.bankId;
    transaction.refPayment = data.refPayment;
    transaction.paymentDate = data.paymentDate;
    transaction.customer = customer;
    return this.transactionRepo.save(transaction);
  }

  async createTransactionSuccess(data: any) {
    const transaction = new TransactionSuccess();
    transaction.transactionId = data.transactionId;
    transaction.name = data.name;
    transaction.amount = data.amount;
    transaction.bankId = data.bankId;
    transaction.refPayment = data.refPayment;
    transaction.paymentDate = data.paymentDate;
    transaction.customer = data.customer;
    return this.transactionSuccessRepo.save(transaction);
  }

  async createTransactionnRejected(data: any) {
    const transaction = new TransactionSuccess();
    transaction.transactionId = data.transactionId;
    transaction.name = data.name;
    transaction.amount = data.amount;
    transaction.bankId = data.bankId;
    transaction.refPayment = data.refPayment;
    transaction.paymentDate = data.paymentDate;
    transaction.customer = data.customer;
    return this.transactionRejectedRepo.save(transaction);
  }

  @Cron('*/5 * * * *') // Ejecuta cada 5 minutos
  async obtenerTransacciones() {
    const token = '136090|YxF0W79rx4zDIHC8sAhI8vQwXxjvUATlwU2UxBDI';
    const id = '6';
    const transacciones = await this.transactionRepo.find({
      relations: ['customer'],
    });

    for (const item in transacciones) {
      const externalResponse = await this.getTransacionElpStatus(
        token,
        transacciones[item].transactionId,
        id,
      );

      if (externalResponse.data.status === 'APPROVED') {
        await this.createTransactionSuccess(transacciones[item]);
        await this.remove(transacciones[item].id);

        console.log(
          'Transaccion aprobada y eliminada de pendientes',
          transacciones[item],
        );
      } else if (externalResponse.data.status === 'REJECTED') {
        await this.createTransactionnRejected(transacciones[item]);
        await this.remove(transacciones[item].id);

        console.log(
          'Transaccion rechazada y eliminada de pendientes',
          transacciones[item],
        );
      }
    }
  }

  async getTransactions(userId: number) {
    return await this.transactionRepo.find({
      where: { customer: { id: userId } },
    });
  }

  async getTransactionsStatus(userId: number) {
    const token = '135446|PlqRhRFc4SB1APSK7ewksoPpce0ww1stbC2N9Ubh';
    const id = '6';
    const transactionsStatus: any = [];

    const transactions = await this.transactionRepo.find({
      where: { customer: { id: userId } },
    });

    for (const item in transactions) {
      const externalResponse = await this.getTransacionElpStatus(
        token,
        transactions[item].transactionId,
        id,
      );

      transactionsStatus.push(externalResponse);
    }

    return transactionsStatus;
  }

  async getTransacionElpStatus(
    token: string,
    transactionId: string,
    id: string,
  ): Promise<any> {
    const url = `https://elp.red/api/v1/checkout/transactionStatus?Token=${transactionId}&account_id=${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(url, { headers });
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw new Error('Error al realizar la solicitud al servicio externo');
    }
  }

  remove(id: number) {
    return this.transactionRepo.delete(id);
  }
}
