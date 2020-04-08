type AppErrorObject = {
  code: number;
  title: string;
  message: string;
  status: number;
};
export class AppError {
  public code: number;
  public title: string;
  public message: string;
  public status: number;
  public constructor(
    code: number,
    title: string,
    message: string,
    status: number
  ) {
    this.code = code;
    this.title = title;
    this.message = message;
    this.status = status;
  }
  public toJS(): AppErrorObject {
    const { code, title, message, status } = this;
    return {
      code,
      title,
      message,
      status,
    };
  }
}
