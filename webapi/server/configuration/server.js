import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';

import oas from './swagger';
import logger from './logger';

const app = new Express();
const { exit } = process;

export default class ExpressServer {
    
    router(routes) {
        this.routes = routes;
        return this;
    }

    initialize(port = process.env.PORT) {
        const root = path.normalize(`${__dirname}/../..`);
        app.set('appPath', `${root}client`);
        app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    
        const welcome = p => () => logger.info(
            `Server up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`,
        );

        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
        });

        oas(app, this.routes).then(() => {
            http.createServer(app).listen(port, welcome(port));
        }).catch(e => {
            logger.error(e);
            exit(1);
        });

        return app;
    }
}
