import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class InfoMail {
  /**
   * Creating a unique key for the job
   * (each job has to have an unique key)
   */

  get key() {
    return 'InfoMail';
  }

  async handle({data}) {
    const {enrollment} = data;

    await Mail.sendMail({
      to: `${enrollment.student.email} <>`,
      subject: 'Confirmação de Cadastro',
      template: 'info',
      context: {
        student_name: enrollment.student.name,
        plano_name: enrollment.plan.title,
        plano_inicio: format(
          parseISO(enrollment.start_date),
          "'dia' dd 'de' MMMM 'de' yyyy",
          {locale: pt}
        ),
        plano_termino: format(
          parseISO(enrollment.end_date),
          "'dia' dd 'de' MMMM 'de' yyyy",
          {locale: pt}
        ),
        plano_valor: enrollment.price,
      },
    });
  }
}

export default new InfoMail();
