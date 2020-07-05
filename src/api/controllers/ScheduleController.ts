import { Request, Response } from 'express';
import * as Yup from 'yup';
import { ValidationError } from 'yup';

import { startOfDay, parseISO } from 'date-fns';

import { getRepository, Between } from 'typeorm';

import { SchedulesDates } from '../models/SchedulesDates';
import { Schedules } from '../models/Schedules';

const storeSchema = Yup.object().shape({
  date: Yup.date().required(),
  entry: Yup.date().nullable(true).default(null),
  lunch: Yup.date().nullable(true).default(null),
  lunch_end: Yup.date().nullable(true).default(null),
  exit: Yup.date().nullable(true).default(null),
});

class ScheduleController {
  async store(req, res: Response) {
    try {
      await storeSchema.validate(req.body);
    } catch (error) {
      const err: ValidationError = error;

      return res.json({ error: err });
    }
    const userId = req.userId;
    const schedulesDatesRepository = getRepository(SchedulesDates);
    const schedules = getRepository(Schedules);

    const scheduleCreated = schedules.create(req.body) as Schedules;
    await schedules.save(scheduleCreated);

    const schedulesDates = schedulesDatesRepository.create({
      schedule_id: scheduleCreated.id,
      user_id: userId,
      date: req.body.date,
    });

    await schedulesDatesRepository.save(schedulesDates);

    return res.json(scheduleCreated);
  }

  async update(req, res: Response) {
    const scheduleRepository = getRepository(Schedules);
    const { schedule_id } = req.params;

    let schedule = (await scheduleRepository.findOne(
      schedule_id
    )) as SchedulesDates;

    schedule = { ...schedule, ...req.body, user_id: req.userId };

    await scheduleRepository.save(schedule);

    return res.json(schedule);
  }

  async index(req: Request, res: Response) {
    const scheduleRepository = getRepository(SchedulesDates);

    const { start_range, end_range } = req.query as any;

    const startDayWeek = parseISO(start_range);
    const endDayWeek = parseISO(end_range);

    const schedules = await scheduleRepository.find({
      join: {
        alias: 'schedules',
        innerJoinAndSelect: {
          schedule: 'schedules.schedule',
        },
        leftJoinAndSelect: {
          user: 'schedules.user',
        },
      },
      where: {
        date: Between(startOfDay(startDayWeek), startOfDay(endDayWeek)),
      },
    });

    return res.json(schedules);
  }

  async show(req: Request, res: Response) {}
}

export default new ScheduleController();
