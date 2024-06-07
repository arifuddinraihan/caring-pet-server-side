/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "http";
import app from "./app";
import config from "./app/config";
import seedSuperAdmin from "./app/DB";

let server: Server;

async function main() {
  // Seeding Super Admin
  seedSuperAdmin();

  server = app.listen(config.port, () => {
    console.log("Sever is running on port ", config.port);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed!");
      });
    }
    process.exit(1);
  };
  process.on("uncaughtException", (error) => {
    console.log(error);
    exitHandler();
  });

  process.on("unhandledRejection", (error) => {
    console.log(error);
    exitHandler();
  });
}

main();
