import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Nest maneja SIGINT/SIGTERM y llamará a onModuleDestroy()
  app.enableShutdownHooks();

  app.enableCors({
    origin: [
      "https://www.joacodev.com.ar",
      "https://joacodev.com.ar",
      "http://localhost:3002",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "http://127.0.0.1:3002",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
