export class Error {

  errorCode: number;
  errorDetail: string;

  constructor(errorCode: number, errorDetail: string) {
    this.errorCode = errorCode;
    this.errorDetail = errorDetail;
  }
}
