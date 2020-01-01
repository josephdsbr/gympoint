/** Libraries Imports */
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
/** Models Import */
import User from '../models/Users';
/** Others */
import authConfig from '../../config/auth';

class SessionController {
  /**
   * Store a session
   * @param {*} req
   * @param {*} res
   */

  async store(req, res) {
    /**
     * Request validator
     */
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    /* Request validation */

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    /**
     * User validation
     */

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    /**
     * Store a session
     */

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    },
  );
  }
}

export default new SessionController();
