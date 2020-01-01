import Op from 'sequelize';
import * as Yup from 'yup';
import Student from '../models/Students';

const schema = Yup.object().shape({
  studentName: Yup.string().required(),
});

class StudentInfoByNameController {
  /**
   * List of informations about a student filtered by name
   */

  async index(req, res) {
    const { studentName } = req.params;

    if (await schema.isValid(req.params)) {
      return res.status(400).json({ error: 'Informat a name' });
    }

    // Decoding an Student Name

    const name = decodeURI(studentName);

    const student = await Student.findOne({
      where: {
        [Op.like]: `%${studentName}%`,
      },
    });

    return res.json(student);
  }
}
