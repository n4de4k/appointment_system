import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';

@Module({
  controllers: [ScheduleController],
  providers: [],
})
export class ScheduleModule {}
