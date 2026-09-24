import { Server } from "@hapi/hapi";
import { translateEndorseController } from "../controllers/endorse.controller";
import { endorsePayloadSchema } from "../entities/endorse.entity";
import * as Jwt from "@hapi/jwt";
import { JWT_SECRET } from "../auth/jwt.strategy";

export const endorseRoutes = (server: Server) => {
  server.route({
    method: "POST",
    path: "/api/v1/endorse/translate",
    options: {
      auth: "jwt_mode",
      validate: {
        payload: endorsePayloadSchema,
        failAction: (_request, _h, err) => {
          throw err;
        },
      },
    },
    handler: translateEndorseController,
  });

  server.route({
    method: "POST",
    path: "/api/v1/auth/login",
    options: {
      auth: false,
    },
    handler: (_request, _h) => {
      const token = Jwt.token.generate(
        { username: "interface.servicios" },
        { key: JWT_SECRET, algorithm: "HS256" },
      );
      return { token };
    },
  });
};
