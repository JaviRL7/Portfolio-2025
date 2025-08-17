"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentSchema = void 0;
const zod_1 = require("zod");
exports.createCommentSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "name requerido").transform(s => s.trim()),
        texto: zod_1.z.string().min(1, "texto requerido").transform(s => s.trim()),
        role: zod_1.z.string().trim().optional(),
    }),
});
