/** Models Imports */
import HelpOther from '../models/HelpOther';
import Student from '../models/Students';

class HelpOtherNotAnswer {
  /**
   * List not answered Help Orders
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const helpOther = await HelpOther.findAll({
      where: {
        answer: null,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(helpOther);
  }
}

export default new HelpOtherNotAnswer();
