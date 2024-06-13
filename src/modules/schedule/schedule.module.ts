import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ReadScheduleSlotService } from './services/read-schedule-slot.service';

@Module({
  controllers: [ScheduleController],
  providers: [ReadScheduleSlotService],
})
export class ScheduleModule {}
