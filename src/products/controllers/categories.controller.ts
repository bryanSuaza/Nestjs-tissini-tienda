import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {

  //recibimos multiples parametros por get
  @Get(':catId/products/:prodId')
  getCategory(
    @Param('catId') idCategoria: string,
    @Param('prodId') productoId: string,
  ): string {
    return `categories ${idCategoria} and products ${productoId}`;
  }

}
