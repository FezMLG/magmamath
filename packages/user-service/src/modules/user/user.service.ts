import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { Prisma } from '@prisma/client';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { NotificationService } from '../notification/notification.service';
import { UserNotFoundError } from './errors/user-not-found.error';
import { PaginateRequest } from '../../shared/common/paginate';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly notificationService: NotificationService,
  ) {
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
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async createUser(data: UserEntity) {
    try {
      const createUser = await this.userRepository.createUser(data);

      await this.notificationService.sendUserCreatedNotification(createUser.id);

      return createUser;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new UserAlreadyExistsError(data.email);
      }
      throw e;
    }
  }

  async updateUser(id: string, data: Partial<UserEntity>) {
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    await this.userRepository.deleteUser(id);

    await this.notificationService.sendUserDeletedNotification(id);
  }
}
