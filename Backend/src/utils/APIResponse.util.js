export class APIResponse {
  constructor(message = "This is Default Message", statusCode, data) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.success = statusCode < 400;
  }
}
