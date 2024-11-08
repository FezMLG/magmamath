import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { PaginateRequest } from './paginate';

@Injectable()
export class UserRepository {

  constructor(private prisma: PrismaService) {}

  async getListPage(paginate: PaginateRequest) {
    return this.prisma.user.findMany({
      skip: paginate.perPage * (paginate.page - 1),
      take: paginate.perPage,
    });
  }

  async getListCount(): Promise<number> {
    return this.prisma.user.count();
  }

  async getUserById(id: string) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
