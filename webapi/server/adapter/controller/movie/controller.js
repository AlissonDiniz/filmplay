import movieService from './../../../application/service/movie-service';

export class MovieController {

    getAll(req, res) {
        movieService
            .getAll(req.body, req.query)
            .then(result => res.json({
                timestamp: new Date().toISOString(),
                data: result
            }));
    }

    create(req, res) {
        movieService
            .create(req.body)
            .then(result => res.status(201).json({
                timestamp: new Date().toISOString(),
                data: result
            }));
    }

    update(req, res) {
        movieService
            .update(req.params.id, req.body)
            .then(result => {
                res.status(200).end();
            })
            .catch(error => {
                res.status(404).end();
            });
    }

    delete(req, res) {
        movieService
            .delete(req.params.id)
            .then(result => {
                res.status(200).end();
            })
            .catch(error => {
                res.status(404).end();
            });
    }
}
export default new MovieController();
