import Fastify from "fastify";
import { db } from "./db";
import { users } from "./db/schema";

const server = Fastify();

server.get("/health", async () => {
  return { status: "ok" };
});

server.get("/users", async () => {
  return db.select().from(users);
});


const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log("🚀 Server running at http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
