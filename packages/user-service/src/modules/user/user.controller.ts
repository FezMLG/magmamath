import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.request-dto';
import { UpdateUserRequestDto } from './dto/update-user.request-dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { UserEntity } from './user.entity';
import { PaginateResponse } from './paginate';

@Controller('user')
export class UserController {

  private readonly DEFAULT_PER_PAGE = 25;
  private readonly DEFAULT_PAGE = 1;

  constructor(private readonly userService: UserService) {
  }

  @Get()
  async getUsers(
    @Query('perPage', ParseIntPipe) perPage?: number,
    @Query('page', ParseIntPipe) page?: number,
  ): Promise<PaginateResponse<UserEntity>> {
    return this.userService.getUsers({
      perPage: perPage ?? this.DEFAULT_PER_PAGE,
      page: page ?? this.DEFAULT_PAGE,
    });
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
