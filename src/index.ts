import express from "express";
import { registerRoute } from "./utils/registerRoute";
import { makeExpressCallback } from "./express-callback/makeExpressCallback";
import { loginController } from "./login/loginController";
const app = express();
const port = 8080;

registerRoute("/login", makeExpressCallback(loginController))(app);

app.listen(port, () => {
  console.log(`Server istening on port ${port}...`);
});
