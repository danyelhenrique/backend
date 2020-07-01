import { Request, Response } from "express";

class ScheduleController {
  async store(req: Request, res: Response) {
    return res.json({ ok: false });
  }
}

export default new ScheduleController();
