import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
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

  private readonly logger = new Logger(UserController.name, { timestamp: true });

  constructor(private readonly userService: UserService) {
  }

  @Get()
  async getUsers(
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage: number = this.DEFAULT_PER_PAGE,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = this.DEFAULT_PAGE,
  ): Promise<PaginateResponse<UserEntity>> {
    this.logger.log(this.getUsers.name, { perPage, page });

    return this.userService.getUsers({
      perPage: perPage,
      page: page,
    });
  }

  @Get('/:id')
  async getUser(@Param('id', ObjectIdValidationPipe) id: string): Promise<UserResponseDto | null> {
    this.logger.log(this.getUser.name, { id });

    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserRequestDto): Promise<UserResponseDto> {
    this.logger.log(this.createUser.name, { createUserDto });

    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id', ObjectIdValidationPipe) id: string, @Body() updateUserDto: UpdateUserRequestDto): Promise<UserResponseDto> {
    this.logger.log(this.updateUser.name, { id, updateUserDto });

    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ObjectIdValidationPipe) id: string): Promise<void> {
    this.logger.log(this.deleteUser.name, { id });

    return this.userService.deleteUser(id);
  }
}
