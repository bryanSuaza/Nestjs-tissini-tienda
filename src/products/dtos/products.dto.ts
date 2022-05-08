//import { PartialType } from "@nestjs/mapped-types";
import { PartialType } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateProductsDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  readonly image: string;
}

export class UpdateProductsDto extends PartialType(CreateProductsDto) {}