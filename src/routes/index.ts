import { Router } from 'express';
import ScheduleController from '../api/controllers/ScheduleController';
import UserController from '../api/controllers/UserController';
import SessionController from '../api/controllers/SessionController';

import authMiddleware from '../api/middlewares/auth';
const route = Router();

route.get('/', (req, res) => res.json({ ok: true }));

route.get('/schedules', ScheduleController.index);

route.post('/users', UserController.store);
route.get('/users', UserController.index);

route.post('/sessions', SessionController.store);

route.use(authMiddleware);
route.post('/schedules', ScheduleController.store);
route.put('/schedules/:schedule_id', ScheduleController.update);

route.put('/users', UserController.update);

export default route;
