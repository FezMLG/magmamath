import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('notification_send_welcome')
  getHello(@Payload() data: string[]): void {
    console.log("Welcome", data);
  }

  @MessagePattern('notification_send_delete')
  getDelete(@Payload() data: string[]): void {
    console.log("Deleting", data);
  }
}
