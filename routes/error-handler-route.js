const HttpClientError = require("../error/HttpClientError");
const logger = require("../config/log-config");

function handleError(err, req, res, next) {
    logger.error('Error occurred!', req, err)
    if (err instanceof HttpClientError) {
        err.respondWithError(res)
        return;
    }
    res.status(500).send(JSON.stringify({text: "Server Error!", error: {err}}))
}

module.exports = handleError;
