import { Module } from '@nestjs/common';
import { PeParserService } from './pe-parser.service';
import { PeParserController } from './pe-parser.controller';
import { PeClientModule } from '../pe-client/pe-client.module';
import { JsDomModule } from '../js-dom/js-dom.module';
import { DataSaverModule } from '../data-saver/data-saver.module';

@Module({
  imports: [PeClientModule, JsDomModule, DataSaverModule],
  controllers: [PeParserController],
  providers: [PeParserService],
})
export class PeParserModule {}
