import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}.local`,
        '.env.development.local.local',
        `.env.${process.env.NODE_ENV || 'development'}`,
      ],
      cache: false,
      isGlobal: true,
    }),
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
