import { Injectable } from '@nestjs/common';
import { Poliza } from '../entities/poliza.entity';
import { InjectRepository } from '@nestjs/typeorm'; // 👈 import
import { Repository } from 'typeorm'; // 👈 import
import { CreatePolizaDto } from '../dtos/poliza.dto';
import { CustomerService } from './cuaromer.service';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class PolizaService {
  constructor(
    @InjectRepository(Poliza) private polizaRepo: Repository<Poliza>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    private customerService: CustomerService,
  ) {}

  async create(data: CreatePolizaDto, userId: number) {
    const poliza = new Poliza();
    poliza.name = data.poliza;
    const customer = await this.customerService.findOne(userId);
    poliza.customer = customer;

    return this.polizaRepo.save(poliza);
  }

  async polizasByCustomer(userId: number) {
    return await this.polizaRepo.find({
      where: { customer: { id: userId } },
    });
  }

  remove(id: number) {
    return this.polizaRepo.delete({ name: id });
  }
}
