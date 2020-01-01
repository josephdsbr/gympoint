import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import User from '../models/Users';

export default async (req, res, next) => {
  /* Taking informations from Request's Header */

  const authHeader = req.headers.authorization;

  /* Header validation */

  if (!authHeader) {
    return res.status(401).json({ entity: { error: 'Token not found' } });
  }

  /* Extracting token from header */

  const [, token] = authHeader.split(' ');

  try {
    /* Decoding token to get informations about user */

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    const user = await User.findOne({ where: { id: decoded.id } });

    /* Verifing if user is authorizated to make the Request */
    if (!(authConfig.adminAccessLevel === user.access_level)) {
      return res.status(401).json({ error: 'Forbidden' });
    }

    /* Storing User ID */

    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.json(401).json({ entity: { error: err } });
  }
};
