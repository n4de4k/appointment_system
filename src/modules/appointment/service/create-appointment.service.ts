import { Injectable } from '@nestjs/common';
import { CreateAppointmentSpec } from '../model/appointment.model';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../entity/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateAppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async createAppointment(spec: CreateAppointmentSpec): Promise<string> {
    let appointment = new AppointmentEntity();
    appointment.appointmentDate = spec.date;
    appointment.appointmentTime = spec.time;
    appointment.user = spec.user;

    appointment = await this.appointmentRepository.save(appointment);

    return appointment.id;
  }
}
