import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Fail to authenticate' });
  }
  const [, token] = authHeader.split(' ');

  const jwtAsync = promisify(jwt.verify);

  try {
    const decoded = await jwtAsync(token, process.env.JWT_SECURITY);
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
};
