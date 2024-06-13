import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/@common/decorators/api-success-response.decorator';
import { ReadScheduleSlotService } from 'src/modules/schedule/services/read-schedule-slot.service';

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
  async getAvailableSlots() {
    return await this.readScheduleSlotService.getAvailableSlot({
      periodStart: '2024-06-01',
      periodEnd: '2024-06-02',
    });
  }
}
