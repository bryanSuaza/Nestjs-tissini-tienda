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
} from '@nestjs/common';

import { ProductsService } from '../../products/services/products.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('filter')
  getProductFilter(): Object {
    return {
      message: 'Yo soy un filter',
    };
  }

  @Get('pagination')
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 55,
  ) {
    return this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneProduct(@Param('id', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  createProduct(@Body() payload: CreateProductsDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body() payload: UpdateProductsDto,
  ) {
    return this.productsService.update(+productId, payload);
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    return this.productsService.remove(+productId);
  }
}
