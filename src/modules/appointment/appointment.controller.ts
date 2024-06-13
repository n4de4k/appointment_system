import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully create appointment',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Appointment can't be created because there's no slot",
  })
  async handleCreateAppointment(@Body() request: CreateAppointmentRequest) {
    return await this.createAppointmentService.createAppointment(request);
  }
}
