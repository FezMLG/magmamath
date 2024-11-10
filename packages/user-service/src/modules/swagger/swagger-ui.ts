import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

export class Swagger {
  constructor(
    private readonly app: INestApplication,
    private readonly swaggerPath: string,
  ) {}

  setup() {
    patchNestJsSwagger();

    const config = new DocumentBuilder()
      .setTitle('Magma API')
      .setVersion('1.0')
      .addTag('user')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup(this.swaggerPath, this.app, document);
  }
}
