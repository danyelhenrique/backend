import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

class SessionController {
  async store(req, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      password: Yup.string(),
    });

    try {
      await schema.isValid(req.body);
    } catch (err) {
      return res.json({ err: 'invalid input' }).status(401);
    }

    const userRepository = getRepository(User);

    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const mathPassword = await bcrypt.compare(password, user.password);

    if (!mathPassword) {
      return res.status(401).json({ error: 'Fail to authenticate' });
    }

    const { id, name, email: Email } = user;

    const payload = { id, name, Email };

    const token = jwt.sign(payload, process.env.JWT_SECURITY as string, {
      expiresIn: '7d',
    });

    return res.json({
      id,
      name,
      email: Email,
      token,
    });
  }
}

export default new SessionController();
