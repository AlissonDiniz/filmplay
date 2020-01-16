import crypto from 'crypto';

export default class PasswordEncoder {
    
    static encode(password) {
        return crypto.pbkdf2Sync(password, process.env.CRYPTO_SECRET, 10000, 32, 'sha512').toString('hex');
    }

    static match(rawPassword, encodedPassword) {
        const password = crypto.pbkdf2Sync(rawPassword, process.env.CRYPTO_SECRET, 10000, 32, 'sha512').toString('hex');
        return encodedPassword === password;
    }
}
    