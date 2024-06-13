import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAppointmentService } from './service/create-appointment.service';
import { CreateAppointmentRequest } from './dto/appointment.dto';

@Controller('appointments')
@ApiTags('Appointment')
export class AppointmentController {
  constructor(
    private readonly createAppointmentService: CreateAppointmentService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new appointment' })
  async handleCreateAppointment(@Body() request: CreateAppointmentRequest) {
    return await this.createAppointmentService.createAppointment(request);
  }
}
