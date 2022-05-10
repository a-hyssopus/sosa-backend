class HttpClientError extends Error {

    constructor(text) {
        super();
        this.text = text;
        this.status = 400;
    }

    respondWithError(res) {
        res.status(this.status).send(JSON.stringify(this));
    }
}

module.exports = HttpClientError;
