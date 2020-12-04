type HttpResponseHeaders = any;
type HttpResponseBody = {
  [key: string]: any;
};
export type HttpResponse = {
  body?: HttpResponseBody;
  statusCode?: number;
  headers?: HttpResponseHeaders;
};
