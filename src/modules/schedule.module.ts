import { Module } from '@nestjs/common';
import { ScheduleController } from '../controllers/schedule.controller';

@Module({
  controllers: [ScheduleController],
  providers: [],
})
export class ScheduleModule {}
