import { Request, Response, RequestHandler } from "express";
import type { HttpRequest } from "src/types/HttpRequest";
import { HttpResponse } from "src/types/HttpResponse";

export const makeExpressCallback = function makeExpressCallback(
  controller: (httpRequest: HttpRequest) => Promise<HttpResponse>
): RequestHandler {
  return async function expressCallback(req: Request, res: Response): Promise<void> {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent")
      }
    };
    const response = await controller(httpRequest);
    if(response.statusCode){
      res.status(response.statusCode)
    }
    if(response.headers){
      res.set(response.headers)
      
    }
    res.send();
  };
};
