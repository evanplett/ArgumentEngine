import {
  Routes
} from './routes';
import * as express from 'express';
import {
  MapRoutesOnApp,
  HandleErrors
} from '../routing_utils';
import * as bodyParser from 'body-parser';

export function RestApp(): express.Application {
  const app = express();
  app.use(bodyParser.json());
  MapRoutesOnApp(app, Routes);
  HandleErrors(app);
  return app;
}
