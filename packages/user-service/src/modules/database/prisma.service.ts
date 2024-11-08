import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  IPrismaModuleOptions,
  MODULE_OPTIONS_TOKEN,
} from './prisma.module-definition';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: IPrismaModuleOptions,
  ) {
    super({ datasources: { db: { url: options.databaseUrl } } });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      console.error('moduleInit', e);
      throw e;
    }
  }
}
