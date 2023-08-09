import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from 'src/auth/models/token.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/users/entities/customer.entity';
import { CreateCustomerDto } from 'src/users/dtos/customer.dto';
import { Poliza } from 'src/users/entities/poliza.entity';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Poliza) private polizaRepo: Repository<Poliza>,

    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(phone: string, identification: string) {
    const user = await this.usersService.findByPhone(phone);
    if (user) {
      const isMatch = user.identification === identification;
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async registerUser(data: CreateCustomerDto) {
    ////Crear Customer
    const customer = new Customer();
    customer.name = data.name;
    customer.lastName = data.lastName;
    customer.email = data.email;
    customer.terms = data.terms;

    const newCustomer = this.customerRepo.create(customer);
    await this.customerRepo.save(newCustomer);

    ////Crear Poliza Principal
    const poliza = new Poliza();
    poliza.name = data.poliza;
    poliza.customer = newCustomer;

    this.polizaRepo.save(poliza);

    ////Crear User Principal
    const user = new User();
    user.phone = data.user.phone;
    user.identification = data.user.identification;
    user.role = data.user.role;
    user.customer = newCustomer;

    const newUser = this.userRepo.create(user);
    await this.userRepo.save(newUser);

    const externalResponse = await this.sendRequestToExternalService(data);

    return {
      extremeData: externalResponse,
      ////Firmar el token con usuario
      data: this.generateJWT(newUser),
    };
  }

  async loginUser(data: CreateCustomerDto, user: User) {
    const externalResponse = await this.sendRequestToExternalService(data);

    delete user.customer.polizas;
    return {
      extremeData: externalResponse,
      data: this.generateJWT(user),
    };
  }

  async sendRequestToExternalService(
    requestBody: CreateCustomerDto,
  ): Promise<CreateCustomerDto> {
    const url = 'https://essmarapp.extreme.com.co/essmarappws/ws/user/register';

    const body = {
      cellPhone: requestBody.user.phone,
      email: requestBody.email,
      identificationNumber: requestBody.user.identification,
      identificationType: '01',
      initialPolicy: requestBody.poliza,
      name: requestBody.name + ' ' + requestBody.lastName,
    };

    try {
      const response = await axios.post(url, body);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw new Error('Error al realizar la solicitud al servicio externo');
    }
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
