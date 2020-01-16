import ExpressJWT from 'express-jwt';

export default ExpressJWT({
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    secret: process.env.JWT_SECRET
});