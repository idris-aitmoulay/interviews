import { initApp } from './app/core/app.init';
import * as express from 'express';
import { Application } from 'express';
import 'reflect-metadata';
import dbConnector from './app/core/db-connector.init';
import { environment } from './app/shared';


console.log('Start initializing app...');

dbConnector.connect(environment.database).then( () => {
    const app: Application = express();

    app.listen(9000, () => {
        console.log('App is running at port 9000');
    });

    initApp(app);
});
