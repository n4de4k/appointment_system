import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentRequest {
  @IsNotEmpty()
  @ApiProperty()
  user: string;
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  date: string;
  @IsNotEmpty()
  @ApiProperty()
  time: string;
}
