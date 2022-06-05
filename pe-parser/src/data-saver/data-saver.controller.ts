import { Controller, Delete } from '@nestjs/common';
import { DataSaverService } from './data-saver.service';

@Controller('data-saver')
export class DataSaverController {
  constructor(private readonly dataSaverService: DataSaverService) {}

  @Delete()
  deleteFiles() {
    return this.dataSaverService.deleteFiles();
  }
}
