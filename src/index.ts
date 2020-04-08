import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { makeExpressCallback } from "./common/express-callback/makeExpressCallback";
import { loginController } from "./user-management/login/controllers/loginController";
import { registrationController } from "./user-management/registration/controllers/registrationController";
const app = express();
const port = 8080;
app.use(bodyParser.json(), cors());
app.post("/login", makeExpressCallback(loginController));
app.post("/register", makeExpressCallback(registrationController));

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
