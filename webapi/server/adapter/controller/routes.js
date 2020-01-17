import authRouter from './auth/router';
import movieRouter from './movie/router';
import serieRouter from './serie/router';
import tokenValidator from './../middlewares/token-validator';

export default function routes(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/serie', tokenValidator, serieRouter);
    app.use('/api/movie', tokenValidator, movieRouter);
}
