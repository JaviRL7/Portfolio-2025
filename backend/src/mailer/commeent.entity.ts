// entities/comment.entity.ts
export interface Comment {
  id: string;
  name: string;
  texto: string;
  role?: string;
  createdAt: string; // ISO
}
