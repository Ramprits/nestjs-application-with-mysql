import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class RoleQueryDto {
  @IsNotEmpty()
  @IsPositive()
  page: number;

  @IsNotEmpty()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsString()
  search: string;
}
