import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { NodeEnvironment } from '../../shared/common/node-environment';

const BaseEnvVariablesSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnvironment),
  DATABASE_URL: z.string(),
  RABBITMQ_URL: z.string(),
  NOTIFICATION_QUEUE_NAME: z.string(),
});
type BaseEnvVariables = z.infer<typeof BaseEnvVariablesSchema>;

@Injectable()
export class BaseConfig {
  readonly nodeEnv: string;
  readonly databaseUrl: string;
  readonly rabbitmqUrl: string;
  readonly notificationQueueName: string;

  constructor(private readonly configService: ConfigService<BaseEnvVariables>) {
    const config = BaseEnvVariablesSchema.parse({
      NODE_ENV: configService.get<NodeEnvironment>('NODE_ENV'),
      DATABASE_URL: configService.get<string>('DATABASE_URL'),
      RABBITMQ_URL: configService.get<string>('RABBITMQ_URL'),
      NOTIFICATION_QUEUE_NAME: configService.get<string>('NOTIFICATION_QUEUE_NAME'),
    });

    this.nodeEnv = config.NODE_ENV;
    this.databaseUrl = config.DATABASE_URL;
    this.rabbitmqUrl = config.RABBITMQ_URL;
    this.notificationQueueName = config.NOTIFICATION_QUEUE_NAME;
  }
}
