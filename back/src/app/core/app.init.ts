import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { initErrorRoutes, initPublicRoutes, initSecuredRoutes, secureRoutes } from './route.init';
import { initJobs } from './app.jobs'
import * as morgan from 'morgan';
import cors = require('cors');


export function initApp(app: Application) {
  app.use(cors({ exposedHeaders: ['Content-Length', 'Location'] }));
  app.use(morgan('common'));
  // @ts-ignore
  app.options('*', cors());
  app.use(bodyParser.json({ limit: '50mb' }));


  initPublicRoutes(app);
  secureRoutes(app);
  initSecuredRoutes(app);
  initErrorRoutes(app);
  initJobs();
}
