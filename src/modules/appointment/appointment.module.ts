import { Module } from '@nestjs/common';
import { ReadAppointmentService } from './service/read-appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './entity/appointment.entity';
import { AppointmentController } from './appointment.controller';
import { CreateAppointmentService } from './service/create-appointment.service';
import { ReadScheduleSlotService } from '../schedule/services/read-schedule-slot.service';

@Module({
  providers: [
    ReadAppointmentService,
    CreateAppointmentService,
    ReadScheduleSlotService,
  ],
  exports: [ReadAppointmentService],
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
