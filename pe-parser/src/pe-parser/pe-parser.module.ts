import { Module } from '@nestjs/common';
import { PeParserService } from './pe-parser.service';
import { PeParserController } from './pe-parser.controller';
import { PeClientModule } from '../pe-client/pe-client.module';
import { JsDomModule } from '../js-dom/js-dom.module';

@Module({
  imports: [PeClientModule, JsDomModule],
  controllers: [PeParserController],
  providers: [PeParserService],
})
export class PeParserModule {}
