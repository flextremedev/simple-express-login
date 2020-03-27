import express from "express";
import { makeExpressCallback } from "./express-callback/makeExpressCallback";
import bodyParser from "body-parser";
import { loginController } from "./user-management/login/controllers/loginController";
import { registrationController } from "./user-management/registration/controllers/registrationController";
const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.post("/login", makeExpressCallback(loginController));
app.post("/register", makeExpressCallback(registrationController));

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
