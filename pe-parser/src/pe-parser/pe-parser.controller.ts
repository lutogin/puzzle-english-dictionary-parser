import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { PeParserService } from './pe-parser.service';
import { StartParseDto } from './dto/start-parse.dto';

@Controller('pe-parser')
export class PeParserController {
  constructor(private readonly peParserCheerioService: PeParserService) {}

  @Get()
  async parse(
    @Query(new ValidationPipe({ transform: true }))
    params: StartParseDto,
  ) {
    this.peParserCheerioService.parse(params);
    return { status: 200 };
  }
}
