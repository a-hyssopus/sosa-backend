const HttpClientError = require("../error/HttpClientError");


function handleError(err, req, res, next) {
    if (err instanceof HttpClientError) {
        err.respondWithError(res)
        return;
    }
    res.status(500).send(JSON.stringify({text: "Server Error!", error: {err}}))
}

module.exports = handleError;
