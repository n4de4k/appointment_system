import { Injectable } from '@nestjs/common';
import { CreateAppointmentSpec } from '../model/appointment.model';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '../entity/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadScheduleSlotService } from 'src/modules/schedule/services/read-schedule-slot.service';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { ServiceException } from 'src/@common/exception/service.exception';
import { ErrorCode } from 'src/@common/exception/error.code';
import { getHourMinute } from 'src/@common/util';

@Injectable()
export class CreateAppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    private readonly readScheduleSlotService: ReadScheduleSlotService,
    private readonly configService: ConfigService,
  ) {}

  async createAppointment(spec: CreateAppointmentSpec): Promise<string> {
    const timeFrame = +this.configService.getOrThrow<number>(
      'TIME_FRAME_IN_MINUTE',
    );
    const slots = await this.readScheduleSlotService.getAvailableSlot({
      periodStart: spec.date,
      periodEnd: spec.date,
    });

    const appointmentTime = moment(spec.date);
    appointmentTime.set(getHourMinute(spec.time));

    const slotDate = moment(spec.date);
    const eligibleSlot = slots.filter((slot) => {
      const slotStart = slotDate.clone();
      slotStart.set(getHourMinute(slot.hour));
      const slotEnd = slotStart.clone();
      slotEnd.add(timeFrame, 'minutes');

      return (
        appointmentTime.isSameOrAfter(slotStart) &&
        appointmentTime.isBefore(slotEnd)
      );
    });
    if (!eligibleSlot.length) {
      throw new ServiceException(ErrorCode.noSlotFound);
    }

    if (eligibleSlot[0].availableSlots == 0) {
      throw new ServiceException(ErrorCode.noAvailableSlot);
    }

    let appointment = new AppointmentEntity();
    appointment.appointmentDate = spec.date;
    appointment.appointmentTime = spec.time;
    appointment.user = spec.user;

    appointment = await this.appointmentRepository.save(appointment);

    return appointment.id;
  }
}
