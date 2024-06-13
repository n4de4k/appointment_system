import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { initTypeORMconfig } from './orm.config';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(initTypeORMconfig()),
    ScheduleModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
