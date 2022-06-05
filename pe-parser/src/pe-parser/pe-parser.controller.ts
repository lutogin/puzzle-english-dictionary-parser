import { Controller, Get } from '@nestjs/common';
import { PeParserService } from './pe-parser.service';

@Controller('pe-parser')
export class PeParserController {
  constructor(private readonly peParserCheerioService: PeParserService) {}

  @Get()
  async parsePEWords() {
    return this.peParserCheerioService.parse();
  }
}
