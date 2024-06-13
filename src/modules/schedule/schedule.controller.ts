import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/@common/decorators/api-success-response.decorator';
import { ReadScheduleSlotService } from 'src/modules/schedule/services/read-schedule-slot.service';
import { GetAvailableScheduleSlotRequest } from './dto/schedule-slot.dto';

export class Foo {
  @ApiProperty()
  foo: string;
}
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
  @ApiSuccessResponse(Foo, 'Successfully get available slot')
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
