import { createUsersDto, updateUsersDto } from '../dtos/users.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista de usuarios en general' })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consulta de usuario por id' })
  @HttpCode(HttpStatus.OK)
  getOrderById(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getUserById(userId);
  }

  //controlador para obtener las ordenes
  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.getOrderByUser(userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  createUser(@Body() payload: createUsersDto) {
    return this.usersService.createUser(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() payload: updateUsersDto,
  ) {
    return this.usersService.updateUser(userId, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
