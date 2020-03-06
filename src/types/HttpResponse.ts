type HttpResponseHeaders = any;
type HttpResponseBody = {
  [key: string]: string;
};
export type HttpResponse = {
  body?: HttpResponseBody;
  statusCode?: number;
  headers?: HttpResponseHeaders;
};
