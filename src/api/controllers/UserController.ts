import { Request, Response } from 'express';
import { getRepository, LessThanOrEqual } from 'typeorm';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';

import { User } from '../models/User';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insert valid email')
    .required('E-mail is required'),
  password: Yup.string().required('Password is required'),
  name: Yup.string().required('Password is required'),
});

class UserController {
  async store(req: Request, res: Response) {
    const userRepository = getRepository(User);

    try {
      await schema.isValid(req.body);
    } catch (err) {
      return res.json({ err: 'invalid input' }).status(401);
    }

    const { name, email, password } = req.body;
    const seriazliedPassword = await bcrypt.hash(password, 8);

    const user = userRepository.create({
      email,
      name,
      password: seriazliedPassword,
    });

    await userRepository.save(user);

    return res.json(user);
  }

  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const data = await userRepository.find();

    return res.json(data);
  }

  async update(req, res: Response) {
    const userRepository = getRepository(User);

    let [user] = await userRepository.find(req.userId as any);
    user = { ...user, ...req.body };

    await userRepository.save(user);

    delete user.password;

    return res.json(user);
  }
}

export default new UserController();
