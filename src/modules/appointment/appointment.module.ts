import { Module } from '@nestjs/common';
import { ReadAppointmentService } from './service/read-appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './entity/appointment.entity';

@Module({
  providers: [ReadAppointmentService],
  exports: [ReadAppointmentService],
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
})
export class AppointmentModule {}
