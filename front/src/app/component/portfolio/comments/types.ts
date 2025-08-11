// component/portfolio/comments/types.ts
export type Theme = { primary: string; secondary: string; accent: string; border: string };

export interface CommentItem {
  id: string;
  name: string;
  role?: string;
  message: string;
  createdAt: string; // ISO
}

export interface CommentsProps {
  theme: Theme;
  isHacker?: boolean;
  initialComments?: CommentItem[];
  onSubmitComment?: (payload: Omit<CommentItem, "id" | "createdAt">) => Promise<CommentItem>;
}
