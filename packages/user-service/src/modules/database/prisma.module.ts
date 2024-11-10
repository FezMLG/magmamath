import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { ConfigurableModuleClass } from './prisma.module-definition';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule extends ConfigurableModuleClass {}
