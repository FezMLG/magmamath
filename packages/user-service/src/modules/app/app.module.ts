import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../database/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BaseConfig } from '../app-config/base-config.service';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}.local`,
        '.env.development.local',
        `.env.${process.env.NODE_ENV || 'development'}`,
      ],
      cache: false,
      isGlobal: true,
    }),
    AppConfigModule,
    UserModule,
    PrismaModule.forRootAsync({
      useFactory: (config: BaseConfig) => {
        return { databaseUrl: config.databaseUrl };
      },
      inject: [BaseConfig],
    }),
  ],
})
export class AppModule {}
