import './configuration/env';
import Server from './configuration/server';
import Database from './configuration/database';
import Bootstrap from './configuration/bootstrap';
import routes from './adapter/controller/routes';

Database.connect().then(Bootstrap.run);

export default new Server().router(routes).initialize(process.env.PORT);
