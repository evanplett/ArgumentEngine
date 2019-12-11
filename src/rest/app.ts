import {
  Routes
} from './routes';
import * as express from 'express';
import {
  MapRoutesOnApp
} from '../routing_utils';
import * as bodyParser from 'body-parser';

export function RestApp(): express.Application {
  const app = express();
  app.use(bodyParser.json());
  MapRoutesOnApp(app, Routes);
  return app;
}
