import { Request, Response, RequestHandler } from "express";
import type { HttpRequest } from "src/common/types/HttpRequest";
import { HttpResponse } from "src/common/types/HttpResponse";

export const makeExpressCallback = function makeExpressCallback(
  controller: (httpRequest: HttpRequest) => Promise<HttpResponse>
): RequestHandler {
  return async function expressCallback(req: Request, res: Response): Promise<void> {
    console.log(req.session)
    const httpRequest: HttpRequest = {
      body: req.body,
      session: req.session,
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
    try{
      const response = await controller(httpRequest);
      if(response.statusCode){
        res.status(response.statusCode)
      }
      if(response.headers){
        res.set(response.headers)
        
      }
      if(response.body){
        res.json(response.body)
      }
      else{
        res.send();
      }
    }
    catch(e){
      console.log(e)
      res.status(500).send({error: 'An unknown error occured.'});
    }
  };
};
