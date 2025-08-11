import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(60)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(500)
  texto: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  role?: string; // <- nuevo
}
