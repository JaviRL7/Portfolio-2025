import { createApp } from "./app";

const PORT = Number(process.env.PORT || 3000);
const HOST = "0.0.0.0"; // importante para PaaS (Railway/Render)
const app = createApp();

app.listen(PORT, HOST, () => {
  console.log(`API listening on http://${HOST}:${PORT}`);
  console.log(`ENV DATABASE_URL: ${process.env.DATABASE_URL ? 'set' : 'missing'}`);
});
