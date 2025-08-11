import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateCommentDto } from './entities/dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  create(dto: CreateCommentDto): Comment {
    const comment: Comment = {
      id: randomUUID(),
      name: dto.name.trim(),
      texto: dto.texto.trim(),
      role: dto.role?.trim() ? dto.role.trim() : undefined, // <- nuevo
      createdAt: new Date().toISOString(),
    };
    this.comments.unshift(comment);
    return comment;
  }

  findAll(): Comment[] {
    return this.comments;
  }
}
