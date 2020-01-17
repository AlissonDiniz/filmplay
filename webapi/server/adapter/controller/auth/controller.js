import authService from './../../../application/service/auth-service';


export class AuthController {

    auth(req, res) {
        authService
            .auth(req.body)
            .then(result => res.status(201).json(result))
            .catch(error => {
                res.status(401).send(error.message);
            });
    }
}
export default new AuthController();
