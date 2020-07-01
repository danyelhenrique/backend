import { Router } from 'express';
import ScheduleController from '../api/controllers/ScheduleController';
const route = Router();

route.get('/', (req, res) => res.json({ ok: true }));

route.get('/schedules', ScheduleController.store);

export default route;
