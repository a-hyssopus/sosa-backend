const HttpClientError = require("./HttpClientError");

class EntityNotFoundError extends HttpClientError {

    constructor(text) {
        super(text);
        this.status = 404;
    }
}

module.exports = EntityNotFoundError;
