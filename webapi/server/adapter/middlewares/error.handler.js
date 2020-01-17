
// Error handler to display the error as HTML
// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.json(
        {
            timestamp: new Date().toISOString(),
            status: err.status || 500,
            message: err.message
        }
    );
}
