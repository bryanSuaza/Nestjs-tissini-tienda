import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

import { ProductsService } from '../../products/services/products.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService){}


  @Get('filter')
  getProductFilter(): Object {
    return {
      message: 'Yo soy un filter',
    };
  }

  //recibimos multiples parametros querys por get
  @Get('pagination')
  getProducts(
    @Query('limit') limit: number = 100, //parametros por defecto
    @Query('offset') offset: number = 55,
  ) {
    return this.productsService.findAll();
  }

  //recibimos un parametro por get y hacemos response con express
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneProduct( @Param('id', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  //creamos un producto con post
  @Post()
  createProduct(@Body() payload: CreateProductsDto) {
    return this.productsService.create(payload);
  }

  //editamos el producto
  @Put(':id')
  updateProduct(@Param('id') productId: string, @Body() payload: UpdateProductsDto) {
    return this.productsService.update(+productId,payload);
  }

  //eliminamos el producto
  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    return this.productsService.remove(+productId);
  }
}
