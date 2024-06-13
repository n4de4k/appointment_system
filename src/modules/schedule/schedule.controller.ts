import {
  Controller,
  Get,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReadScheduleSlotService } from 'src/modules/schedule/services/read-schedule-slot.service';
import { GetAvailableScheduleSlotRequest } from './dto/schedule-slot.dto';

@Controller('schedules')
@ApiTags('Schedule')
export class ScheduleController {
  constructor(
    private readonly readScheduleSlotService: ReadScheduleSlotService,
  ) {}

  @Get('slots')
  @ApiOperation({
    summary: 'Get available slot from period of time',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully get slot',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request param',
  })
  async getAvailableSlots(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    request: GetAvailableScheduleSlotRequest,
  ) {
    return await this.readScheduleSlotService.getAvailableSlot({
      periodStart: request.periodStart,
      periodEnd: request.periodEnd,
    });
  }
}
