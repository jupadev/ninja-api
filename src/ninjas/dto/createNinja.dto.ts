import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

const levels = ['beginner', 'senior', 'master', 'legend'] as const;
export class CreateNinjaDto {
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsString()
  @IsOptional()
  weapon?: string;

  @IsIn(levels)
  level: 'beginner' | 'senior' | 'master' | 'legend';

  @IsInt()
  @Min(0)
  @Max(100)
  life: number;
}

export class UpdateNinjaDto {
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  weapon: string;

  @IsIn(levels)
  @IsOptional()
  level: 'beginner' | 'senior' | 'master' | 'legend';

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  life: number;
}
