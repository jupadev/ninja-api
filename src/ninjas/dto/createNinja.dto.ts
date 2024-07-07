export class CreateNinjaDto {
  name: string;
  weapon: 'sword' | 'stars' | 'nunchakus';
  level: 'beginner' | 'senior' | 'master' | 'legend';
  life: number;
}
