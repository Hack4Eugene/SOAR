function RequestError (message, code, uri, status) {
    if (!status) {
        switch (code) {
            case 'NOT_FOUND':
                status = 404;
                break;
            case 'BAD_REQUEST':
                status = 400;
                break;
            case 'ACCESS_DENIED':
                status = 401;
                break;
            case 'UNPROCESSABLE':
                status = 422;
                break;
            default:
                status = 500;
        }
    }

    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code || 'SERVER_ERROR';
    this.uri = uri;
    this.message = message;
    this.status = status || 500;
}

RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.source = Error.prototype.toSource;

module.exports = RequestError;