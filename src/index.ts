import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import graphqlHTTP from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { makeExpressCallback } from "./common/express-callback/makeExpressCallback";
import { PingResolver } from "./common/resolvers/PingResolver";
import { loginController } from "./user-management/controllers/loginController";
import { registrationController } from "./user-management/controllers/registrationController";
import { logoutController } from "./user-management/controllers/logoutController";
import { isAuthenticatedController } from "./user-management/use-cases/isAuthenticatedController";
import { commonSchema } from "./common/schema";
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
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
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
