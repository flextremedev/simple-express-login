import { Application, RequestHandler } from "express";

export const registerRoute = function registerRoute(
  path: string,
  callback: RequestHandler
) {
  return function registerRouteWithApp(app: Application): void {
    app.get(path, callback);
  };
};
