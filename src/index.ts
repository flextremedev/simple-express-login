import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import { makeExpressCallback } from "./common/express-callback/makeExpressCallback";
import { loginController } from "./user-management/login/controllers/loginController";
import { registrationController } from "./user-management/registration/controllers/registrationController";
import { logoutController } from "./user-management/logout/controllers/logoutController";
import { protectedRoute } from "./common/express-middleware/protectedRoute";
import { isAuthenticatedController } from "./user-management/isAuthenticated/use-cases/isAuthenticatedController";
const app = express();
const port = 8080;

app.use(
    bodyParser.json(),
    cors({
        origin: "http://localhost:3000",
        credentials: true
    }),
    session({
        name: "sid",
        secret: "secret",
        cookie: {
            maxAge: 1000 * 60,
            sameSite: "none",
            secure: false,
            httpOnly: true
        },
        resave: false,
        saveUninitialized: false
    })
);
app.get("/", protectedRoute, (req: Request, res: Response) => {
    res.status(200).json(req.session);
});
app.post("/login", makeExpressCallback(loginController));
app.post("/register", makeExpressCallback(registrationController));
app.post("/logout", makeExpressCallback(logoutController));
app.get("/isAuthenticated", makeExpressCallback(isAuthenticatedController));

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
