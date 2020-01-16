import mongoose from 'mongoose';
import logger from './logger';

export default class Database {

    static connect(callback) {
        mongoose.Promise = Promise;
        logger.info('Connecting Mongo DB: %s', process.env.MONGODB_URI);
        return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            mongoose.Types.ObjectId.prototype.view = () => ({ id: this.toString() });
            mongoose.connection.db.dropDatabase();
            mongoose.connection.on('error', (err) => {
                logger.error(`MongoDB connection error: ${err}`);
                process.exit(-1);
            });
        }).then(callback);
    }

}
