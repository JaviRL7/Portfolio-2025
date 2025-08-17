import { prisma } from "../db";

export type CreateCommentInput = { name: string; texto: string; role?: string };

export class CommentsService {
  async create(data: CreateCommentInput) {
    return prisma.comment.create({
      data: { name: data.name.trim(), texto: data.texto.trim(), role: data.role?.trim() || null },
    });
  }

  async list() {
    return prisma.comment.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }
}
