import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { BaseConfig } from '../app-config/base-config.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  imports:[
    ClientsModule.registerAsync([
      {
        imports: [AppConfigModule],
        name: 'NOTIFICATION_SERVICE',
        useFactory: async (config: BaseConfig) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.rabbitmqUrl],
            queue: 'notification_queue',
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [BaseConfig],
      },
    ]),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController]
})
export class UserModule {}
