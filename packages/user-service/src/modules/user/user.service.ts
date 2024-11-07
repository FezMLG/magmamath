import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

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
