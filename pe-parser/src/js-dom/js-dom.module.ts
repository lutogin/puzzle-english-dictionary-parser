import { Module } from '@nestjs/common';
import { JsDomService } from './js-dom.service';

@Module({
  providers: [JsDomService],
  exports: [JsDomService],
})
export class JsDomModule {}
