import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Checkin from '../models/Checkins';
import User from '../models/Users';
import Student from '../models/Students';

class CheckinController {
  /**
   * List Checkin by used
   * @param {*} req
   * @param {*} res
   */

  async index(req, res) {
    /**
     * Input validation
     */

    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Treatments and Returns
     */

    const checkin = await Checkin.findAll({ where: { student_id: studentId } });

    return res.json(checkin);
  }

  /**
   * Store checkin
   * @param {*} req
   * @param {*} res
   */

  async store(req, res) {
    /**
     * Input validation
     */

    const studentExists = await Student.findByPk(req.params.studentId);

    if (!studentExists) {
      return res.status(401).json({ error: 'Student does not exist' });
    }

    /**
     * Validation if Student is more then 5 times in the last 7 current days
     */

    const finalDate = new Date();
    const initDate = (d => {
      d.setDate(d.getDate() - 7);
      return d;
    })(new Date());

    const countChecking = await Checkin.findAndCountAll({
      where: {
        student_id: req.params.studentId,
        created_at: {
          [Op.between]: [startOfDay(initDate), endOfDay(finalDate)],
        },
      },
    });

    if (countChecking.count >= 5) {
      return res.status(401).json({ error: 'Limit exceeded' });
    }

    /**
     * Creating a checkin
     */

    const checkin = await Checkin.create({ student_id: req.params.studentId });

    return res.json(checkin);
  }
}

export default new CheckinController();
