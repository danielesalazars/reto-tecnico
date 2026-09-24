import * as Jwt from "@hapi/jwt";

export const JWT_SECRET = "secreto_super_seguro_para_endosos_2026";

export const registerJwtAuth = async (server: any) => {
  await server.register(Jwt);

  server.auth.strategy("jwt_mode", "jwt", {
    keys: JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400,
      timeSkewSec: 15,
    },
    validate: async (artifacts: any, request: any, _h: any) => {
      if (artifacts.decoded.payload.username) {
        return { isValid: true };
      }
      return { isValid: false };
    },
  });
};
