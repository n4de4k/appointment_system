import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
export class AppointmentEntity {
  @Generated('uuid')
  @PrimaryColumn()
  id: string;
  @Column({ type: 'date' })
  appointmentDate: string;
  @Column({ type: 'time' })
  appointmentTime: string;
  @Column({ type: 'varchar', length: 255 })
  user: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
