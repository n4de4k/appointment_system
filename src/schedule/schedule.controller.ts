import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/@common/decorators/api-success-response.decorator';
import { Response } from 'src/@common/dto/response.dto';

export class Foo {
  @ApiProperty()
  foo: string;
}
@Controller('schedules')
@ApiTags('Schedule')
export class ScheduleController {
  @Get('slots')
  @ApiOperation({
    summary: 'Get available slot from period of time',
  })
  @ApiSuccessResponse(Foo, 'Successfully get available slot')
  getAvailableSlots(): Response<{ foo: string }> {
    return Response.success({ foo: 'bar' });
  }
}
