import { Request } from "express";
type HttpRequestHeaders = {
  "Content-Type": ReturnType<Request["get"]>;
  Referer: ReturnType<Request["get"]>;
  "User-Agent": ReturnType<Request["get"]>;
};
export type HttpRequest = {
  body: Request["body"];
  query: Request["query"];
  params: Request["params"];
  ip: Request["ip"];
  method: Request["method"];
  path: Request["path"];
  headers: HttpRequestHeaders;
  session?: { [key: string]: unknown };
};
