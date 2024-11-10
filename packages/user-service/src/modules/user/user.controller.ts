import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.request-dto';
import { UpdateUserRequestDto } from './dto/update-user.request-dto';
import { UserEntity } from './user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserResponseDto } from './dto/user.response-dto';
import { PaginateResponse } from '../../shared/common/paginate';
import { ObjectIdValidationPipe } from '../../shared/common/object-id-validation.pipe';

@UsePipes(ZodValidationPipe)
@Controller('users')
@ApiTags('user')
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

  @Get('/:id')
  async getUser(@Param('id', ObjectIdValidationPipe) id: string): Promise<UserResponseDto | null> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserRequestDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id', ObjectIdValidationPipe) id: string, @Body() updateUserDto: UpdateUserRequestDto): Promise<UserResponseDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ObjectIdValidationPipe) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
