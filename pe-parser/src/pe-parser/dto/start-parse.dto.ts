import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class StartParseDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  startPage?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  endPage?: number;
}
