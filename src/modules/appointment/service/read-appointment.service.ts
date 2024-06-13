import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from '../entity/appointment.entity';
import { Repository } from 'typeorm';
import { Appointment } from '../model/appointment.model';

@Injectable()
export class ReadAppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async getAppointmentInDatePeriod(
    periodStart: string,
    periodEnd: string,
  ): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .where(
        '(appointment.appointmentDate >= :periodStart AND appointment.appointmentDate <= :periodEnd)',
        {
          periodStart,
          periodEnd,
        },
      )
      .getMany();

    return appointments.map((appointment) => {
      const [hour, minute] = appointment.appointmentTime.split(':');
      return {
        date: appointment.appointmentDate,
        hour: +hour,
        minute: +minute,
      };
    });
  }
}
