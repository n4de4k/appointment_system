import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class ScheduleSlotDto {
  date: string;
  time: string;
  availableSlots: number;
}

export class GetAvailableScheduleSlotRequest {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  periodStart: string;
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  periodEnd: string;
}
