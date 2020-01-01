/** Libraries Imports */
import * as Yup from 'yup';
/** Models Imports */
import Student from '../models/Students';
import HelpOther from '../models/HelpOther';
/** Jobs */
import AnswerMail from '../jobs/AnswerMail';
/** Other */
import Queue from '../../lib/Queue';

class HelpOtherAnswer {
  /**
   * Store a answer to HelpOrder
   * @param {*} req
   * @param {*} res
   */

  async store(req, res) {
    /**
     * Request validator
     */

    const schema = Yup.object().shape({
      answer: Yup.string()
        .required()
        .max(255),
    });

    /** Request validation */

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    /**
     * HelpOrder validation
     */

    const helpOther = await HelpOther.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOther) {
      return res.status(401).json({ error: 'Request does not exist' });
    }

    /**
     * Updating, adding in Mail Job and returning answer
     */

    req.body.answer_at = new Date();

    await helpOther.update(req.body);

    Queue.add(AnswerMail.key, { helpOther });

    return res.json(helpOther);
  }
}

export default new HelpOtherAnswer();
