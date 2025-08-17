/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from "@nestjs/common";
import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    const options: SMTPTransport.Options = {
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: {
        user: process.env.SMTP_USER ?? "",
        pass: process.env.SMTP_PASS ?? "",
      },
    };
    this.transporter = nodemailer.createTransport(options);
  }

  async send(
    to: string,
    subject: string,
    html: string,
    text?: string,
  ): Promise<void> {
    // 1) Alias tipado para que el linter/TS vean el tipo exacto
    const sendMail: (
      opts: SendMailOptions,
    ) => Promise<SMTPTransport.SentMessageInfo> =
      this.transporter.sendMail.bind(this.transporter);

    const mail: SendMailOptions = {
      from:
        process.env.MAIL_FROM ??
        `Portfolio Notifier <${process.env.SMTP_USER ?? "no-reply@local"}>`,
      to,
      subject,
      html,
      text,
    };

    await sendMail(mail);
  }

  async sendCommentNotification(
    name: string,
    role: string,
    message: string,
  ): Promise<void> {
    const html = `
      <h2>Nuevo comentario recibido</h2>
      <p><strong>Nombre:</strong> ${name || "—"}</p>
      <p><strong>Rol:</strong> ${role || "—"}</p>
      <p><strong>Mensaje:</strong></p>
      <blockquote>${message || "—"}</blockquote>
    `;
    await this.send(
      "joaco.martinez1480@gmail.com",
      "Nuevo comentario en tu portfolio",
      html,
    );
    this.logger.log("📧 Email de comentario enviado");
  }
}
