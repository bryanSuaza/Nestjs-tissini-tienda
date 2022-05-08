import { Product } from './../../products/entities/product.entity';
import { Persona } from './user.entity';

export class Order {
  date: Date;
  user: Persona;
  products: Product[];
}
