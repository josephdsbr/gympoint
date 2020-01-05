/** Libraries Imports */
import * as Yup from 'yup';
/** Models Imports */
import {Op} from 'sequelize';
import User from '../models/Users';

class UserController {
  /**
   * List all users
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const {name} = req.params;
    const user =
      name !== undefined
        ? await User.findOne({
            where: {name: {[Op.like]: decodeURIComponent(name)}},
          })
        : await User.findAll();

    return res.json(user);
  }

  /**
   * Store a User
   * @param {*} req
   * @param {*} res
   */

  async store(req, res) {
    /**
     * Input validator
     */

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation Fails'});
    }

    /**
     * User validation
     */

    const userExists = await User.findOne({where: {email: req.body.email}});

    if (userExists) {
      return res.status(401).json({error: 'E-mail already used.'});
    }

    /**
     * Creating and returning User
     */

    const {id, name, email, password_hash, provider} = await User.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      password_hash,
      provider,
    });
  }

  /**
   * Update a user
   * @param {*} req
   * @param {*} res
   */

  async update(req, res) {
    /**
     * Request validator
     */
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation fails'});
    }

    /**
     * User validation
     */

    const {email, oldPassword} = req.body;

    const user = await User.findByPk(req.userId);

    /** E-mail validation */

    if (email !== user.email) {
      const userExists = await User.findOne({where: {email}});

      if (userExists) {
        return res.status(400).json({error: 'User already exists'});
      }
    }

    /** Check password */

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({error: 'Password does not match'});
    }

    /**
     * Updating and Returning User
     */

    const {id, name, provider} = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}
export default new UserController();
