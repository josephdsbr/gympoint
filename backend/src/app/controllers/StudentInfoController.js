import Student from '../models/Students';

class StudentInfoController {
  /**
   * List info from a student
   * @param {*} req
   * @param {*} res
   */

  async index(req, res) {
    const { studentId } = req.params;
    const student = await Student.findByPk(studentId);
    return res.json(student);
  }
}

export default new StudentInfoController();
