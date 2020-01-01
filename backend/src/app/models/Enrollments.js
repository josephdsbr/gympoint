import Sequelize, { Model } from 'sequelize';
import { isBefore, isAfter } from 'date-fns';
import Plan from './Plans';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DOUBLE,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async enrollment => {
      const { duration, price } = await Plan.findOne({
        where: { id: enrollment.plan_id },
      });

      /**
       * Setting date
       */

      const date = new Date(enrollment.start_date.getTime());

      enrollment.end_date = new Date(date.setMonth(date.getMonth() + duration));

      /**
       * Setting price
       */

      enrollment.price = price;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Enrollment;
