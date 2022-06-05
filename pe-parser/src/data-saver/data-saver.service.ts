import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DataSaverService {
  private baseDirectory = path.join(__dirname, '..', '..', 'out');

  writeToFile(file, data): void {
    fs.writeFile(
      path.join(this.baseDirectory, `${file}.txt`),
      data,
      {
        encoding: 'utf8',
      },
      (err) => {
        if (err) {
          Logger.error(err?.message || err);
        }
      },
    );
  }

  saveWords(data: string): void {
    this.writeToFile('words', data);
  }

  saveTranslation(data: string): void {
    this.writeToFile('translations', data);
  }

  deleteFiles(): void {
    fs.unlinkSync(path.join(this.baseDirectory, 'words.txt'));
    fs.unlinkSync(path.join(this.baseDirectory, 'translations.txt'));
  }
}
