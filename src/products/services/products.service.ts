import { Injectable, Delete, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;

  private products: Product[] = [
    {
      id: 1,
      name: 'Blusa',
      description: 'Tela fria',
      price: 121200,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException(`El producto con el id ${id} no existe`);
    }

    return product;
  }

  create(payload: CreateProductsDto) {
    this.counterId = this.counterId + 1;

    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: UpdateProductsDto) {
    const product = this.findOne(id);

    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }

    return {
      message: `No se encontro un producto con el id: ${id}`,
    };
  }

  remove(id: number) {
    const product = this.findOne(id);

    if (!product) {
      throw new NotFoundException(
        `No se encontro el producto con el id: ${id}`,
      );
    }

    const index = this.products.findIndex((item) => item.id === id);
    this.products.splice(index, 1);

    return {
      message: `producto ${id} eliminado exitosamente`,
      products: this.products,
    };
  }
}
