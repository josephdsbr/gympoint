/** Libraries Imports */
import * as Yup from 'yup';
/** Models Imports */
import Student from '../models/Students';

class StudentController {
  /**
   * List all Students
   * @param {*} req
   * @param {*} res
   */

  async index(req, res) {
    const student = await Student.findAll();
    return res.json(student);
  }

  /**
   * Store a Student
   * @param {*} req
   * @param {*} res
   */

  async store(req, res) {
    /**
     * Input validator
     */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().min(0),
      height: Yup.number().min(0),
    });

    /** Request validation */

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    /**
     * Student validation
     */

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(401).json({ error: 'E-mail already used' });
    }

    /**
     * Storing and returning student
     */

    const { id, name, email } = await Student.create(req.body);

    return res.json({
      entity: {
        student: {
          id,
          name,
          email,
        },
      },
    });
  }

  /**
   * Update a student
   * @param {*} req
   * @param {*} res
   */

  async update(req, res) {
    /**
     * Request validator
     */

    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .positive()
        .required(),
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .min(0),
      weight: Yup.number().min(0),
      height: Yup.number().min(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ entity: { error: 'Validation fails' } });
    }

    /**
     * Student validation
     */

    const { id } = req.body;

    const studentExists = await Student.findOne({ where: { id } });

    if (!studentExists) {
      return res.status(401).json({ entity: { error: 'Student not found' } });
    }

    /**
     * Updating and return Student
     */
    const { name, email, age, weight, height } = req.body;

    try {
      await Student.update(
        {
          name,
          email,
          age,
          weight,
          height,
        },
        { where: { id } }
      );

      return res.json({
        entity: {
          user: { name, email },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req, res) {
    const { studentId: id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: "Student doesn't exist" });
    }

    try {
      await Student.destroy({
        where: {
          id,
        },
      });

      return res.json({ message: 'Student destroyed successfully' });
    } catch (e) {
      return res.status(400).send({ error: e });
    }
  }
}

export default new StudentController();
