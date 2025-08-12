// src/comments/comments.module.ts
import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service'; // o como se llame
import { CommentsController } from './comment.controller';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [MailerModule], // <-- clave: importar el módulo que lo exporta
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
