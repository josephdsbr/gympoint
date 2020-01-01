import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  /*
  Verify if a request is sending correct token.
  */

  /*
    Token must have send on Requests' Headers and it must have the format: "Barear token"
  */

  if (!authHeader) {
    return res.status(401).json({ entity: { error: 'Token not found' } });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.json(401).json({ error: err });
  }
};
