import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import {
  ReadAvailableSlotSpec,
  ScheduleSlot,
} from '../model/schedule-slot.model';

@Injectable()
export class ReadScheduleSlotService {
  async getAvailableSlot(spec: ReadAvailableSlotSpec) {
    const periodEnd = moment(spec.periodEnd);
    periodEnd.set({ hour: 18, minute: 0, second: 0, millisecond: 0 });

    const currentTime = moment(spec.periodStart);
    this.setTimeAtStartOfDay(currentTime);

    const slots: ScheduleSlot[] = [];
    while (currentTime.isBefore(periodEnd)) {
      const tempCurrentTime = currentTime.clone();
      currentTime.add(30, 'minutes');

      if (!this.isTimePassEndOfDay(currentTime)) {
        slots.push({
          date: tempCurrentTime.format('YYYY-MM-DD'),
          hour: tempCurrentTime.format('HH:mm'),
        });
      } else {
        currentTime.add(1, 'days');
        this.setTimeAtStartOfDay(currentTime);
      }
    }

    return slots;
  }

  private isTimePassEndOfDay(time: moment.Moment): boolean {
    return time.hour() > 18;
  }

  private setTimeAtStartOfDay(time: moment.Moment) {
    time.set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
  }
}
