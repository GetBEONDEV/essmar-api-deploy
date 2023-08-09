import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 👈 import
import { Repository } from 'typeorm'; // 👈 import
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  find() {
    return this.customerRepo.find({ relations: ['policies'] });
  }

  async findOne(id: number): Promise<Customer | null> {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`customer with id ${id} not found`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto): Promise<Customer | null> {
    const newCustomer = await this.customerRepo.create(data);
    return this.customerRepo.save(newCustomer);
  }

  async update(
    id: number,
    changes: UpdateCustomerDto,
  ): Promise<Customer | null> {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`customer with id ${id} not found`);
    }
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  async remove(id: number) {
    return await this.customerRepo.delete(id);
  }
}
