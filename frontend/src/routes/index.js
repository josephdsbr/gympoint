import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line import/no-named-as-default
import Route from './Route';

import SignIn from '../pages/SignIn';
import Student from '../pages/Student';
import Plan from '../pages/Plan';
import Enrollment from '../pages/Enrollment';
import HelpOther from '../pages/HelpOther';
import StudentRegister from '../pages/StudentRegister';
import PlanRegister from '../pages/PlanRegister';
import EnrollmentRegister from '../pages/EnrollmentRegister';
import StudentUpdate from '../pages/StudentUpdate';
import PlanUpdate from '../pages/PlanUpdate';
import EnrollmentUpdate from '../pages/EnrollmentUpdate';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/student" exact component={Student} isPrivate />
      <Route path="/plan" exact component={Plan} isPrivate />
      <Route path="/enrollment" exact component={Enrollment} isPrivate />
      <Route path="/help-other" exact component={HelpOther} isPrivate />
      <Route
        path="/student/register"
        exact
        component={StudentRegister}
        isPrivate
      />
      <Route path="/plan/register" exact component={PlanRegister} isPrivate />
      <Route
        path="/enrollment/register"
        exact
        component={EnrollmentRegister}
        isPrivate
      />
      <Route path="/student/update" exact component={StudentUpdate} isPrivate />
      <Route path="/plan/update" exact component={PlanUpdate} isPrivate />
      <Route
        path="/enrollment/update"
        exact
        component={EnrollmentUpdate}
        isPrivate
      />
    </Switch>
  );
}
