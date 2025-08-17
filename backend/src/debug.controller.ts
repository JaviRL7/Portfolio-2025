import { Controller, Get } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Controller("debug")
export class DebugController {
  @Get("db")
  async db() {
    const info = await prisma.$queryRaw<
      { db: string; schema: string; host: string }[]
    >`
      select current_database() as db, current_schema() as schema, inet_server_addr()::text as host
    `;
    const last = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return { info: info[0], last };
  }
}
