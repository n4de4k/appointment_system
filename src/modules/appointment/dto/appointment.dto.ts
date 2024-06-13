import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentRequest {
  @IsNotEmpty()
  user: string;
  @IsNotEmpty()
  @IsDateString()
  date: string;
  @IsNotEmpty()
  time: string;
}
