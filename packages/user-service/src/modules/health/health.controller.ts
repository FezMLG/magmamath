import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
  ) {
  }

  @Get()
  @HealthCheck()
  async checkHealth() {
    return this.health.check([]);
  }
}