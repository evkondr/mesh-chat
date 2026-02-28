export default class ErrorApi extends Error {
  status: number;
  constructor(status:number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
  static Unauthorized() {
    return new ErrorApi(401, 'User is not authorized');
  }
  static BadRequest(message:string) {
    return new ErrorApi(400, message);
  }
  static NotFound(message:string) {
    return new ErrorApi(404, message);
  }
}