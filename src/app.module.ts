import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from './modules/schedule/schedule.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
