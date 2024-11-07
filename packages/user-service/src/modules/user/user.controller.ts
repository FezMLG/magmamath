import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.request-dto';
import { UpdateUserRequestDto } from './dto/update-user.request-dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('{id}')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  @UsePipes(ZodValidationPipe)
  async createUser(@Body() createUserDto: CreateUserRequestDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put('{id}')
  @UsePipes(ZodValidationPipe)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserRequestDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('{id}')
  @UsePipes()
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
