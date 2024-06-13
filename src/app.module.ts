import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { initTypeORMconfig } from './orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(initTypeORMconfig()),
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
