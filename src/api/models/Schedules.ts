import 'reflect-metadata';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SchedulesDates } from './SchedulesDates';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  entry?: Date;

  @Column({ nullable: true })
  lunch?: Date;

  @Column({ nullable: true })
  lunch_end?: Date;

  @Column({ nullable: true })
  exit?: Date;

  @OneToMany(() => SchedulesDates, (schedulesDates) => schedulesDates.schedule)
  user_connection?: SchedulesDates[];
}
