import { IsIn, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';

const levels = ['beginner', 'senior', 'master', 'legend'] as const;
const weapons = ['sword', 'stars', 'nunchakus'] as const;
export class CreateNinjaDto {
  @IsInt()
  id: number;
  @MinLength(3)
  @MaxLength(30)
  name: string;
  @IsIn(weapons)
  weapon: 'sword' | 'stars' | 'nunchakus';
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
  name: string;
  @IsIn(weapons)
  weapon: 'sword' | 'stars' | 'nunchakus';
  @IsIn(levels)
  level: 'beginner' | 'senior' | 'master' | 'legend';
  @IsInt()
  @Min(0)
  @Max(100)
  life: number;
}
