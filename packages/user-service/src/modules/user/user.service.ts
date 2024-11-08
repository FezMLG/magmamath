import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { PaginateRequest } from './paginate';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationService: ClientProxy,
  ) {
    this.notificationService.connect().then(() => {
      console.log('Notification service connected');
    }).catch((err) => {
      console.error('Notification service connection error', err);
    });
  }

  async getUsers(paginate: PaginateRequest) {
    const pagePromise = this.userRepository.getListPage(paginate);
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
    const createUser = await this.userRepository.createUser(data);

    await this.notificationService.emit('notification_send', createUser.id).toPromise().catch((err) => {
      console.error('Notification send error', err);
    });

    return createUser;
  }

  async updateUser(id: string, data: Partial<UserEntity>) {
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
