import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Swagger } from './modules/swagger/swagger-ui';
import { RMQ_NOTIFICATION_SERVICE_TOKEN } from './modules/notification/rmq-notification-service.token';
import { ClientProxy } from '@nestjs/microservices';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const swaggerPath = 'docs';
  new Swagger(app, '/' + swaggerPath).setup();

  const port = process.env.PORT || 3333;

  await app.listen(port);

  app.get<ClientProxy>(RMQ_NOTIFICATION_SERVICE_TOKEN).connect().then(() => {
    console.log('📯 Notification service connected');
  }).catch((err: any) => {
    console.error('📯❗️ Notification service connection error', err);
  });

  console.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  console.log(
    `📚 Docs are running on: http://localhost:${port}/${swaggerPath}`,
  );

  console.log('⚙️ Environment:', process.env.NODE_ENV);
}

process.on('uncaughtException', function (exception) {
  console.log(exception);
});

bootstrap();
