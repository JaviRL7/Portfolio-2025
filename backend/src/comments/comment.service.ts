// comments.service.ts
import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CreateCommentDto } from "./entities/dto/create-comment.dto";
import { Comment } from "./entities/comment.entity";
import { MailerService } from "../mailer/mailer.service";

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  constructor(private readonly mailer: MailerService) {}

  create(dto: CreateCommentDto): Comment {
    const comment: Comment = {
      id: randomUUID(),
      name: dto.name.trim(),
      texto: dto.texto.trim(),
      role: dto.role?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    this.comments.unshift(comment);

    // --- escape seguro para el HTML del correo
    const escapeHtml = (s: string) =>
      s.replace(
        /[&<>"']/g,
        (ch) =>
          (
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            }) as const
          )[ch]!,
      );

    const fecha = new Date(comment.createdAt).toLocaleString("es-AR");

    const html = `
      <div style="font-family:system-ui,Arial,sans-serif;max-width:600px;margin:auto">
        <h2>Nuevo comentario en tu portfolio</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(comment.name)}${comment.role ? ` — <em>${escapeHtml(comment.role)}</em>` : ""}</p>
        <p><strong>Fecha:</strong> ${escapeHtml(fecha)}</p>
        <p><strong>Mensaje:</strong></p>
        <blockquote style="border-left:4px solid #8b5cf6;padding:8px 12px;background:#f8f5ff">
          ${escapeHtml(comment.texto)}
        </blockquote>
        <p style="color:#666;font-size:12px;margin-top:12px">ID: ${comment.id}</p>
      </div>
    `;

    const text = `Nuevo comentario
Nombre: ${comment.name}${comment.role ? ` (${comment.role})` : ""}
Fecha: ${fecha}
Mensaje: ${comment.texto}
ID: ${comment.id}`;

    // Resolver string | undefined y catch tipado (unknown -> narrow a Error)
    const owner = process.env.OWNER_EMAIL;
    if (!owner) {
      console.warn("OWNER_EMAIL no está definido; no se envía email.");
      return comment;
    }

    this.mailer
      .send(owner, "Nuevo comentario en tu portfolio", html, text)
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.error("❌ Error enviando mail:", err.message);
        } else {
          console.error("❌ Error desconocido enviando mail:", err);
        }
      });

    return comment;
  }

  findAll(): Comment[] {
    return this.comments;
  }
}
