// src/mailer/mailer.module.ts
import { Module } from "@nestjs/common";
import { MailerService } from "./mailer.service";

@Module({
  providers: [MailerService],
  exports: [MailerService], // <-- clave: exportarlo
})
export class MailerModule {}
