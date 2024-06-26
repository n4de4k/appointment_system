import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import {
  ReadAvailableSlotSpec,
  ScheduleSlot,
} from '../model/schedule-slot.model';
import { ConfigService } from '@nestjs/config';
import { ReadAppointmentService } from 'src/modules/appointment/service/read-appointment.service';
import { Appointment } from 'src/modules/appointment/model/appointment.model';
import { ServiceException } from 'src/@common/exception/service.exception';
import { ErrorCode } from 'src/@common/exception/error.code';

@Injectable()
export class ReadScheduleSlotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly readAppointmentService: ReadAppointmentService,
  ) {}

  async getAvailableSlot(spec: ReadAvailableSlotSpec) {
    const maxAppointmentSlot = +this.configService.getOrThrow<number>(
      'MAX_APPOINTMENT_SLOT',
    );
    const timeFrame = +this.configService.getOrThrow<number>(
      'TIME_FRAME_IN_MINUTE',
    );
    const startOperationalHour = +this.configService.getOrThrow<number>(
      'OPERATIONAL_START_HOUR',
    );
    const endOperationalHour = +this.configService.getOrThrow<number>(
      'OPERATIONAL_END_HOUR',
    );
    const operationalDays = this.configService
      .getOrThrow<string>('OPERATIONAL_DAYS')
      .split('-')
      .map((dayStr) => +dayStr);
    console.log({ operationalDays });
    const associatedAppointmentByDate =
      await this.getAssociatedAppointmentByDate(spec);

    const periodEnd = moment(spec.periodEnd);
    periodEnd.set({
      hour: endOperationalHour,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const currentTime = moment(spec.periodStart);
    this.setTimeAtStartOfDay(currentTime, startOperationalHour);

    if (currentTime.isAfter(periodEnd)) {
      throw new ServiceException(ErrorCode.periodStartMoreThanEnd);
    }

    const slots: ScheduleSlot[] = [];
    while (currentTime.isBefore(periodEnd)) {
      const slotStartTime = currentTime.clone();
      currentTime.add(timeFrame, 'minutes');

      const dayOfWeek = currentTime.day();

      if (
        !operationalDays.includes(dayOfWeek) ||
        currentTime.hour() > endOperationalHour
      ) {
        currentTime.add(1, 'days');
        this.setTimeAtStartOfDay(currentTime, startOperationalHour);
      } else {
        const appointmentsOnDate =
          associatedAppointmentByDate.get(currentTime.format('YYYY-MM-DD')) ??
          [];

        const appointmentTime = currentTime.clone();

        let totalBookedAppointment = 0;
        for (const appointment of appointmentsOnDate) {
          appointmentTime.set({
            hour: appointment.hour,
            minute: appointment.minute,
          });

          if (
            appointmentTime.isSameOrAfter(slotStartTime) &&
            appointmentTime.isBefore(currentTime)
          )
            totalBookedAppointment += 1;
        }

        const availableSlot = maxAppointmentSlot - totalBookedAppointment;
        slots.push({
          date: slotStartTime.format('YYYY-MM-DD'),
          hour: slotStartTime.format('HH:mm'),
          availableSlots: availableSlot < 0 ? 0 : availableSlot,
        });
      }
    }

    return slots;
  }

  private async getAssociatedAppointmentByDate(
    spec: ReadAvailableSlotSpec,
  ): Promise<Map<string, Appointment[]>> {
    const existingAppointments =
      await this.readAppointmentService.getAppointmentInDatePeriod(
        spec.periodStart,
        spec.periodEnd,
      );

    const result = new Map<string, Appointment[]>();
    for (const appointment of existingAppointments) {
      if (!result.has(appointment.date)) {
        result.set(appointment.date, []);
      }

      result.get(appointment.date).push(appointment);
    }

    return result;
  }

  private setTimeAtStartOfDay(
    time: moment.Moment,
    startOperationalHour: number,
  ) {
    time.set({
      hour: startOperationalHour,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
  }
}
