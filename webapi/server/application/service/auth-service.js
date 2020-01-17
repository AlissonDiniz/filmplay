import logger from '../../configuration/logger';
import SecurityUser from './../domain/security-user';
import jwt from 'jsonwebtoken';
import PasswordEncoder from './../../util/password-encoder';


class AuthService {

    createIdToken(securityUser) {
        return jwt.sign({username: securityUser.username}, process.env.JWT_SECRET, { expiresIn: 60*60*5 });
    }
      
    createJWT() {
        return jwt.sign({
            iss: process.env.JWT_ISSUER,
            aud: process.env.JWT_AUDIENCE,
            exp: Math.floor(Date.now() / 1000) + (60 * Number(process.env.JWT_EXPIRE_MINUTES)),
            scope: 'full_access',
            sub: "",
            jti: this.createJTI(),
            alg: 'HS256'
        }, process.env.JWT_SECRET);
    }

    createJTI() {
        let jti = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 16; i++) {
            jti += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return jti;
    }

    async auth(credentials) {
        logger.info(`${this.constructor.name}.auth() with credentials ${JSON.stringify(credentials)}`);
        const securityUser = await SecurityUser.findOne({
			username: credentials.username
        });
        if (!securityUser) {
            logger.error(`Security User not found for credentials ${JSON.stringify(credentials)}`);
            throw Error(`The username or password don't match`);
        }

        if (!PasswordEncoder.match(credentials.password, securityUser.password)) {
            throw Error(`The username or password don't match`);
        }

        return {
            id_token: this.createIdToken(securityUser),
            access_token: this.createJWT()
        };
    }

}

export default new AuthService();
