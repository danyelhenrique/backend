import 'reflect-metadata';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SchedulesDates } from './SchedulesDates';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  avatar_url!: string;

  @OneToMany(() => SchedulesDates, (schedules_dates) => schedules_dates.user)
  schedules_connection!: SchedulesDates[];
}
