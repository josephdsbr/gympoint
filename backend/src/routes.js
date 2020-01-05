import {Router} from 'express';
import cors from 'cors';

/* Controllers imports */
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import StudentController from './app/controllers/StudentController';
import StudentInfoController from './app/controllers/StudentInfoController';

import PlanController from './app/controllers/PlanController';
import PlanInfoController from './app/controllers/PlanInfoController';

import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';

import HelpOtherNotAnswerController from './app/controllers/HelpOtherNotAnswerController';
import HelpOtherController from './app/controllers/HelpOtherController';
import HelpOtherAnswerController from './app/controllers/HelpOtherAnswerController';

/* Middlewares imports */
import AuthMiddleware from './app/middlewares/auth';
import AuthAdminMiddleware from './app/middlewares/admin-auth';
import HelpOtherNotAnswerInfoController from './app/controllers/HelpOtherNotAnswerInfoController';
import EnrollmentInfoController from './app/controllers/EnrollmentInfoController';

const routes = new Router();
routes.use(cors());
routes.post('/sessions', SessionController.store);

routes.post('/students', AuthAdminMiddleware, StudentController.store);

routes.get('/students/:studentId', StudentInfoController.index);
routes.get('/students/', AuthAdminMiddleware, StudentController.index);
routes.delete('/students/:studentId', StudentController.delete);

/**
 * Help Others
 */

routes.post('/students/:studentId/help-others', HelpOtherController.store);
routes.get('/students/:studentId/help-others', HelpOtherController.index);

/**
 * Help Other Not Answer
 */

routes.get('/help-others-not-answer', HelpOtherNotAnswerController.index);

/**
 * Help Other Answer
 */

routes.post(
  '/help-others/:id/anwser',
  AuthAdminMiddleware,
  HelpOtherAnswerController.store
);

/**
 * Help Other Not Answered Info
 */

routes.get('/help-others/:id/info', HelpOtherNotAnswerInfoController.index);
/**
 * Checkings
 */

routes.get('/students/:studentId/checkins', CheckinController.index);
routes.post('/students/:studentId/checkins', CheckinController.store);

routes.post('/plans', AuthAdminMiddleware, PlanController.store);
routes.get('/plans/:id', AuthAdminMiddleware, PlanInfoController.index);
routes.put('/plans/:id', AuthAdminMiddleware, PlanController.update);
routes.delete('/plans/:id', AuthAdminMiddleware, PlanController.delete);

routes.get('/enrollments/:enrollmentId', EnrollmentInfoController.index);
routes.get('/enrollments', AuthAdminMiddleware, EnrollmentController.index);
routes.post('/enrollments', AuthAdminMiddleware, EnrollmentController.store);
routes.put(
  '/enrollments/:id',
  AuthAdminMiddleware,
  EnrollmentController.update
);
routes.delete(
  '/enrollments/:id',
  AuthAdminMiddleware,
  EnrollmentController.delete
);

routes.get('/plans', AuthAdminMiddleware, PlanController.index);
routes.use(AuthMiddleware);

routes.put('/students', StudentController.update);
routes.put('/users', UserController.update);
routes.post('/users', UserController.store);
routes.get('/users/:name?', UserController.index);

module.exports = routes;
