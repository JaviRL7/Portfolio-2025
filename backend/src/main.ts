import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Si usás cookies cross-site, detrás de proxy:
  // app.set('trust proxy', 1);

  const ALLOWED = new Set([
    "https://www.joacodev.com.ar",
    "https://joacodev.com.ar",
  ]);

  app.enableCors({
    origin: (
      origin: string | undefined,
      cb: (err: Error | null, allow?: boolean) => void,
    ) => {
      // permite healthchecks / curl (sin origin)
      if (!origin) return cb(null, true);
      cb(null, ALLOWED.has(origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // (opcional) log rápido para ver el preflight en server
  // app.use((req, _res, next) => { console.log(req.method, req.headers.origin, req.path); next(); });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
