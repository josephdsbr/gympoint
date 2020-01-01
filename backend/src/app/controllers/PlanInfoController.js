import Plan from '../models/Plans';

class PlanInfoController {
  /**
   * Information from a Plan
   * @param {*} req
   * @param {*} res
   */

  async index(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    return res.json(plan);
  }
}

export default new PlanInfoController();
