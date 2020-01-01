/** Libraries Imports */
import * as Yup from 'yup';
/** Models' Import */
import Plan from '../models/Plans';

class PlanController {
  /**
   * List all plans
   * @param {*} req
   * @param {*} res
   */

  async index(req, res) {
    const plan = await Plan.findAll();
    return res.json(plan);
  }

  /**
   * Store a Plan
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    /**
     * Input validation
     */
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .min(0)
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    });

    /* Request validation with Yup */

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    /**
     * Plan validation
     */

    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(400).json({ error: "Plan's title has to be unique" });
    }

    /**
     * Storing and returning plan
     */

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  /**
   * Update a model
   * @param {*} req
   * @param {*} res
   */

  async update(req, res) {
    /**
     * Schema validator
     */
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number()
        .integer()
        .min(0),
      price: Yup.number().min(0),
    });

    /* Request validation */

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ error: 'Identification not provided ' });
    }

    /**
     * Plan validation
     */

    const planExists = await Plan.findOne({ where: { id } });

    if (!planExists) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    const plan = await Plan.update(req.body, { where: { id } });

    /**
     * Returning updated plan
     */

    const updatedPlan = await Plan.findOne({ where: { id } });

    return res.json(updatedPlan);
  }

  /**
   * Deleting a Plan
   * @param {*} req
   * @param {*} res
   */

  async delete(req, res) {
    /**
     * Plan validation
     */

    const { id } = req.params;

    const planExists = await Plan.findOne({ where: { id } });

    if (!planExists) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    /**
     * Destroying and returning
     */

    await Plan.destroy({ where: { id } });
    return res.json({ message: `Plan ${id} was removed!` });
  }
}

export default new PlanController();
