import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class RoleQueryDto {
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  page: number;
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  search: string;
}
