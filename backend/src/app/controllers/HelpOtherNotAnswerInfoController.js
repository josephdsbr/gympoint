import HelpOther from '../models/HelpOther';

class HelpOtherNotAnswerInfo {
  /**
   * Info of a not answered help question
   * @param {*} req
   * @param {*} res
   */

  async index(req, res) {
    const { id } = req.params;
    const helpOther = await HelpOther.findByPk(id);
    return res.json(helpOther);
  }
}

export default new HelpOtherNotAnswerInfo();
