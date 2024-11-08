import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { PaginateRequest } from './paginate';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getUsers(paginate: PaginateRequest) {
    const pagePromise =  this.userRepository.getListPage(paginate);
    const countPromise = this.userRepository.getListCount();

    const [page, count] = await Promise.all([pagePromise, countPromise]);

    return {
      pageInfo: {
        total: count,
        perPage: paginate.perPage,
        lastPage: Math.ceil(count / paginate.perPage),
        currentPage: paginate.page,
        hasNextPage: (paginate.page - 1) * paginate.perPage < count,
      },
      data: page,
    };
  }

  async getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  async createUser(data: UserEntity) {
    return this.userRepository.createUser(data);
  }

  async updateUser(id: string, data: Partial<UserEntity>) {
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
