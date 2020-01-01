/** Others */
import Mail from '../../lib/Mail';

class AnswerMail {
  /**
   * Creating a unique key for the job
   * (each job has to have an unique key)
   */

  get key() {
    return 'AnswerMail';
  }

  /**
   * Executed by the job
   * @param {helpOrder} data
   */

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.email} <>`,
      subject: 'Resposta ao Questionamento',
      template: 'answer-help',
      context: {
        student_name: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
  }
}

export default new AnswerMail();
