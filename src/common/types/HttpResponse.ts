type HttpResponseHeaders = any;
type HttpResponseBody = {
  [key: string]: string | number;
};
export type HttpResponse = {
  body?: HttpResponseBody;
  statusCode?: number;
  headers?: HttpResponseHeaders;
};
