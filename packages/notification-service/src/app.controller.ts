import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('notification_send')
  getHello(@Payload() data: string[]): void {
    console.log(data);
  }
}
