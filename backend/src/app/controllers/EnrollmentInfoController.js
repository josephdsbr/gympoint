import Enrollment from '../models/Enrollments';
import Student from '../models/Students';
import Plan from '../models/Plans';

class EnrollmentInfoController {
  /**
   * Information about a enrollment
   * @param {*} req
   * @param {*} res
   */

  async index(req, res) {
    const {enrollmentId: id} = req.params;
    const enrollment = await Enrollment.findByPk(id, {
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

    if (!enrollment) {
      return res.status(400).json({error: "Enrollment doesn't exist"});
    }

    return res.json(enrollment);
  }
}

export default new EnrollmentInfoController();
