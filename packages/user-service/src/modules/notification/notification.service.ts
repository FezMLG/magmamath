import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQ_NOTIFICATION_SERVICE_TOKEN } from './rmq-notification-service.token';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(RMQ_NOTIFICATION_SERVICE_TOKEN)
    private readonly notificationService: ClientProxy,
  ) {
    this.notificationService.connect().then(() => {
      console.log('Notification service connected');
    }).catch((err) => {
      console.error('Notification service connection error', err);
    });
  }

  async sendUserCreatedNotification(userId: string): Promise<void> {
    await this.notificationService.emit('notification_send', userId).toPromise().catch((err) => {
      console.error('Notification send error', err);
    });
  }

  async sendUserDeletedNotification(userId: string): Promise<void> {
    await this.notificationService.emit('notification_send', userId).toPromise().catch((err) => {
      console.error('Notification send error', err);
    });
  }
}