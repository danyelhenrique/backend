import 'reflect-metadata';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Schedules } from './Schedules';

@Entity()
export class SchedulesDates {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  user_id?: number;

  @Column({ nullable: true })
  schedule_id?: number;

  @Column({ nullable: false })
  date?: Date;

  @ManyToOne(() => User, (user) => user.schedules_connection, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Schedules, (schedule) => schedule.user_connection, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'schedule_id' })
  schedule!: Schedules;
}
