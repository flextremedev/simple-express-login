import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import { makeExpressCallback } from "./common/express-callback/makeExpressCallback";
import { loginController } from "./user-management/login/controllers/loginController";
import { registrationController } from "./user-management/registration/controllers/registrationController";
const app = express();
const port = 8080;
const protectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session?.userId) {
    console.log("Authenticated");
    next();
  } else {
    console.log("Unauthenticated");
    res.status(401).end();
  }
};
app.use(
  bodyParser.json(),
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  session({
    name: "sid",
    secret: "secret",
    cookie: {
      maxAge: 360000,
      sameSite: "none",
      secure: false,
      httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.get("/", protectedRoute, (req: Request, res: Response) => {
  res.status(200).json(req.session);
});
app.post("/login", makeExpressCallback(loginController));
app.post("/register", makeExpressCallback(registrationController));

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
