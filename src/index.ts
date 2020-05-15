import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import graphqlHTTP from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { makeExpressCallback } from "./common/express-callback/makeExpressCallback";
import { PingResolver } from "./common/resolvers/PingResolver";
import { loginController } from "./user-management/controllers/loginController";
import { registrationController } from "./user-management/controllers/registrationController";
import { logoutController } from "./user-management/controllers/logoutController";
import { commonSchema } from "./common/schema";
import { isAuthenticatedController } from "./user-management/controllers/isAuthenticatedController";
const main = async (): Promise<void> => {
  const app = express();
  const port = 8080;
  const schema = makeExecutableSchema({
    typeDefs: `
    ${commonSchema}
    `,
    resolvers: [PingResolver],
  });
  app.use(
    bodyParser.json(),
    session({
      name: "sid",
      secret: "secret",
      cookie: {
        maxAge: 1000 * 60,
        sameSite: "none",
        secure: false,
        httpOnly: true,
      },
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'"],
        manifestSrc: ["'self'"],
        connectSrc: ["'self'"],
      },
      loose: false,
      setAllHeaders: false,
      reportOnly: true,
      browserSniff: false,
    }),
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      maxAge: 10886400,
    }),
    helmet.hsts({
      maxAge: 10886400,
      includeSubDomains: true,
      preload: true,
    }),
    helmet.frameguard({
      action: "deny",
    }),
    helmet.referrerPolicy({
      policy: "no-referrer",
    }),
    helmet.hidePoweredBy(),
    helmet.xssFilter()
  );
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
  app.post("/login", makeExpressCallback(loginController));
  app.post("/register", makeExpressCallback(registrationController));
  app.post("/logout", makeExpressCallback(logoutController));
  app.get("/isAuthenticated", makeExpressCallback(isAuthenticatedController));

  app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
};
main();
