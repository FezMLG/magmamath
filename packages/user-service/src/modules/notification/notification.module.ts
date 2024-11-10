import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { BaseConfig } from '../app-config/base-config.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { RMQ_NOTIFICATION_SERVICE_TOKEN } from './rmq-notification-service.token';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [AppConfigModule],
        name: RMQ_NOTIFICATION_SERVICE_TOKEN,
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
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {
}