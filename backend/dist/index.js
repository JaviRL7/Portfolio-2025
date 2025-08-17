"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = Number(process.env.PORT || 3000);
const HOST = "0.0.0.0"; // importante para PaaS (Railway/Render)
const app = (0, app_1.createApp)();
app.listen(PORT, HOST, () => {
    console.log(`API listening on http://${HOST}:${PORT}`);
    console.log(`ENV DATABASE_URL: ${process.env.DATABASE_URL ? 'set' : 'missing'}`);
});
