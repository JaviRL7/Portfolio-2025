import type { Request, Response, NextFunction } from "express";
import { CommentsService } from "../services/comments.service";
import { sendMail } from "../services/mailer.service";

export class CommentsController {
  constructor(private readonly svc: CommentsService) {}

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.svc.list();
      res.json(items);
    } catch (e) { next(e); }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await this.svc.create(req.body);

      const owner = process.env.OWNER_EMAIL;
      if (owner && process.env.SMTP_HOST && process.env.SMTP_HOST !== "smtp.tu-proveedor.com") {
        const esc = (s: string) => s.replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]!));
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
        sendMail(owner, "Nuevo comentario en tu portfolio", html, text).catch(console.error);
      }

      res.status(201).json(created);
    } catch (e) { next(e); }
  };
}
