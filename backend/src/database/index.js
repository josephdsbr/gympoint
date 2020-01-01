import Sequelize from 'sequelize';

import User from '../app/models/Users';
import Student from '../app/models/Students';
import Plan from '../app/models/Plans';
import Enrollment from '../app/models/Enrollments';
import Checkin from '../app/models/Checkins';
import HelpOther from '../app/models/HelpOther';

import databaseConfig from '../config/database';

const models = [User, Student, Plan, Enrollment, Checkin, HelpOther];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));

    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
