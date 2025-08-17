"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const mailer_service_1 = require("../services/mailer.service");
class CommentsController {
    constructor(svc) {
        this.svc = svc;
        this.list = async (_req, res, next) => {
            try {
                const items = await this.svc.list();
                res.json(items);
            }
            catch (e) {
                next(e);
            }
        };
        this.create = async (req, res, next) => {
            try {
                const created = await this.svc.create(req.body);
                const owner = process.env.OWNER_EMAIL;
                if (owner) {
                    const esc = (s) => s.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
                    const fecha = new Date(created.createdAt).toLocaleString("es-AR");
                    const html = `
          <div style="font-family:system-ui,Arial,sans-serif;max-width:600px;margin:auto">
            <h2>Nuevo comentario</h2>
            <p><strong>Nombre:</strong> ${esc(created.name)}${created.role ? ` — <em>${esc(created.role)}</em>` : ""}</p>
            <p><strong>Fecha:</strong> ${esc(fecha)}</p>
            <blockquote style="border-left:4px solid #8b5cf6;padding:8px 12px;background:#f8f5ff">${esc(created.texto)}</blockquote>
            <p style="color:#666;font-size:12px;margin-top:12px">ID: ${created.id}</p>
          </div>`;
                    const text = `Nuevo comentario\nNombre: ${created.name}${created.role ? ` (${created.role})` : ""}\nFecha: ${fecha}\nMensaje: ${created.texto}\nID: ${created.id}`;
                    (0, mailer_service_1.sendMail)(owner, "Nuevo comentario en tu portfolio", html, text).catch(console.error);
                }
                res.status(201).json(created);
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.CommentsController = CommentsController;
