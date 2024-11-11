import { Global, Module } from '@nestjs/common';
import { BaseConfig } from './base-config.service';

@Global()
@Module({
  providers: [BaseConfig],
  exports: [BaseConfig],
})
export class AppConfigModule {}
