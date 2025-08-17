import { IsString, IsOptional, Length } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @Length(1, 80)
  name!: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsString()
  @Length(1, 300)
  texto!: string;
}
