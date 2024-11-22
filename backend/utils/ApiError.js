class ApiError extends Error {
  constructor(code, message) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.code = code;
    this.success = false;
    this.message = message;
    Error.captureStackTrace(this);
  }
}

module.exports = ApiError;
