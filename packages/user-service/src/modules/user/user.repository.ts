import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {

  async getUserById(id: string): Promise<UserEntity> {
    return {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: new Date()
    }
  }

  async createUser(data: UserEntity): Promise<UserEntity> {
    return data;
  }

  async updateUser(id: string, data: Partial<UserEntity>): Promise<void> {
  }

  async deleteUser(id: string): Promise<void> {
  }
}
