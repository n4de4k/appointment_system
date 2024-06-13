import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ReadScheduleSlotService } from './services/read-schedule-slot.service';
import { AppointmentModule } from '../appointment/appointment.module';

@Module({
  imports: [AppointmentModule],
  controllers: [ScheduleController],
  providers: [ReadScheduleSlotService],
})
export class ScheduleModule {}
