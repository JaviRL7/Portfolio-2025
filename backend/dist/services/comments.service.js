"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const db_1 = require("../db");
class CommentsService {
    async create(data) {
        return db_1.prisma.comment.create({
            data: { name: data.name.trim(), texto: data.texto.trim(), role: data.role?.trim() || null },
        });
    }
    async list() {
        return db_1.prisma.comment.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    }
}
exports.CommentsService = CommentsService;
