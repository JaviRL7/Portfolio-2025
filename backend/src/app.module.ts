// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comment.module';

@Module({
  imports: [CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
