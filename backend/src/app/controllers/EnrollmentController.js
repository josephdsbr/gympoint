/** Libraries Imports */
import * as Yup from 'yup';
/** Models Imports */
import Enrollment from '../models/Enrollments';
import Student from '../models/Students';
import Plan from '../models/Plans';
/** Jobs */
import InfoMail from '../jobs/InfoMail';
/** Models */
/** Others */
import Queue from '../../lib/Queue';

class EnrollmentController {
  /**
   * List all enrollments
   * @param {*} req
   * @param {*} res
   */

  async index(req, res) {
    const enrollment = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    return res.json(enrollment);
  }

  /**
   * Store a enrollment
   * @param {*} req
   * @param {*} res
   */

  async store(req, res) {
    /**
     * Input validator
     */

    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .positive()
        .required(),
      plan_id: Yup.number()
        .integer()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    /* Request validation with Yup */

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Enrollment validation
     */

    const enrollmentExists = await Enrollment.findOne({
      where: { student_id: req.body.student_id },
    });

    if (enrollmentExists) {
      return res
        .status(401)
        .json({ error: 'Student already has an enrollment' });
    }

    /**
     * UserId Request Input validation
     */

    const userExists = await Student.findByPk(req.body.student_id);

    if (!userExists) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    /**
     * PlanID Request Input validation
     */

    const planExists = await Plan.findByPk(req.body.plan_id);

    if (!planExists) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    /**
     * Storing enrollment
     */

    const { id } = await Enrollment.create(req.body);

    /**
     * Transforming data to response
     */

    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['duration', 'title'],
        },
      ],
    });

    /**
     * Adding info to a email job
     */

    await Queue.add(InfoMail.key, { enrollment });

    return res.json(enrollment);
  }

  /**
   * Update a enrollment
   * @param {*} req
   * @param {*} res
   */

  async update(req, res) {
    /**
     * Request validator
     */

    const { id } = req.params;

    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .positive(),
      plan_id: Yup.number()
        .integer()
        .positive(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Enrollment validation
     */

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exist' });
    }

    /**
     * Updating and return enrollment
     */

    const newEnrollment = await enrollment.update(req.body);

    return res.json(newEnrollment);
  }

  /**
   * Deleting a enrollment
   * @param {*} req
   * @param {*} res
   */

  async delete(req, res) {
    /**
     * Enrollment validation
     */

    const { id } = req.params;

    const enrollmentExists = await Enrollment.findByPk(id);

    if (!enrollmentExists) {
      return res.status(400).json({ error: 'Register does not exist' });
    }

    /**
     * Destroying and returning
     */

    await Enrollment.destroy({ where: { id } });

    return res.json({ message: 'Register was removed' });
  }
}

export default new EnrollmentController();
