import serieService from './../../../application/service/serie-service';

export class SerieController {

    getAll(req, res) {
        serieService
            .getAll(req.body, req.query)
            .then(result => res.json({
                timestamp: new Date().toISOString(),
                data: result
            }));
    }

    create(req, res) {
        serieService
            .create(req.body)
            .then(result => res.status(201).json({
                timestamp: new Date().toISOString(),
                data: result
            }));
    }

    update(req, res) {
        serieService
            .update(req.params.id, req.body)
            .then(result => {
                res.status(200).end();
            })
            .catch(error => {
                res.status(404).end();
            });
    }

    delete(req, res) {
        serieService
            .delete(req.params.id)
            .then(result => {
                res.status(200).end();
            })
            .catch(error => {
                res.status(404).end();
            });
    }
}
export default new SerieController();
