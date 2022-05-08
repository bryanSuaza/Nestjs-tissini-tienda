import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { createUsersDto, updateUsersDto } from '../dtos/users.dto';
import { Order } from '../entities/order.entity';
import { ProductsService } from '../../products/services/products.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private counter = 1;

  private users = [
    {
      id: 1,
      name: 'bryan',
      username: 'bryansugi',
      password: '1222sfdfd',
    },
  ];

  getUsers() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    const arrayUsers = this.users;

    if (!arrayUsers) {
      throw new NotFoundException(`No se encontraron registros de usuarios`);
    }

    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(
        `No se encuntro ningun usuario con el id: ${id}`,
      );
    }

    return user;
  }

  createUser(payload: createUsersDto) {
    this.counter = this.counter + 1;

    this.users.push({
      id: this.counter,
      ...payload,
    });

    return {
      message: `usuario ${payload.name} creado exitosamente`,
      users: this.users,
    };
  }

  updateUser(id: number, payload: updateUsersDto) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(`No se encontro el usuario con el id: ${id}`);
    }

    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };

    return {
      message: `Usuario ${payload.name} actualizado exitosamente`,
      users: this.users[index],
    };
  }

  deleteUser(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`No se encontro el usuario con el id: ${id}`);
    }

    const index = this.users.findIndex((item) => item.id === id);
    this.users.splice(index, 1);

    return {
      message: `Ususario ${user.name} eliminado exitosamente`,
      users: this.users,
    };
  }

  getOrderByUser(id: number): Order {
    const user = this.users.find((item) => item.id === id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
