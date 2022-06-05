import { Module } from '@nestjs/common';
import { DataSaverService } from './data-saver.service';
import { DataSaverController } from './data-saver.controller';

@Module({
  providers: [DataSaverService],
  exports: [DataSaverService],
  controllers: [DataSaverController],
})
export class DataSaverModule {}
