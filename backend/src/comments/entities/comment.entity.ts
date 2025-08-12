export class Comment {
  id!: string;
  name!: string;
  role?: string;
  texto!: string;
  createdAt!: string; // o Date si preferís: createdAt!: Date;
}
