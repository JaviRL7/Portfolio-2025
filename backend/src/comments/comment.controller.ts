import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateCommentDto } from "./entities/dto/create-comment.dto";
import { CommentsService } from "./comment.service";
import { Comment } from "./entities/comment.entity";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() dto: CreateCommentDto): Comment {
    return this.commentsService.create(dto);
  }

  @Get()
  findAll(): Comment[] {
    return this.commentsService.findAll();
  }
}
