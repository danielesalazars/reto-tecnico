import "reflect-metadata";
import Hapi from "@hapi/hapi";
import { endorseRoutes } from "./routes/endorse.route";
import { AppDataSource } from "./config/database.config";
import { seedTemplates } from "./config/seeder.config";
import { registerJwtAuth } from "./auth/jwt.strategy";

const init = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log(
        "Conexión a la Base de Datos con TypeORM establecida exitosamente.",
      );

      await seedTemplates();
    }

    const server = Hapi.server({
      port: 4000,
      host: "0.0.0.0",
      routes: {
        cors: {
          origin: ["*"],
        },
      },
    });

    await registerJwtAuth(server);

    endorseRoutes(server);

    server.route({
      method: "GET",
      path: "/health",
      options: { auth: false },
      handler: () => ({
        status: "OK",
        message: "Servicio traductor de endosos activo",
      }),
    });

    await server.start();
    console.log(`Servidor Hapi corriendo exitosamente en: ${server.info.uri}`);
  } catch (error) {
    console.error("Error al iniciar el servidor o conectar a la BD:", error);
  }
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
