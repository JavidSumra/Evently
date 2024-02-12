export class APIError extends Error {
  constructor(
    message = "This is Default Error Message",
    statusCode,
    errors = [],
    stack = ""
  ) {
    super(message);
    this.data = null; //There is No Data Sent to User on Error
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;

    // Checking if Error Stack Available

    if (this.stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
