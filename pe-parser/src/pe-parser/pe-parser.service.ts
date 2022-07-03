import { Injectable, Logger } from '@nestjs/common';
import { PeClientService } from '../pe-client/pe-client.service';
import { JsDomService } from '../js-dom/js-dom.service';
import { DataSaverService } from '../data-saver/data-saver.service';
import { StartParseDto } from './dto/start-parse.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PeParserService {
  private readonly selectorWords;
  private readonly selectorTranslations;

  constructor(
    private readonly config: ConfigService,
    private readonly client: PeClientService,
    private readonly parser: JsDomService,
    private readonly writer: DataSaverService,
  ) {
    this.selectorWords = this.config.get<string>('SELECTOR_WORDS');
    this.selectorTranslations = this.config.get<string>(
      'SELECTOR_TRANSLATIONS',
    );
  }

  private cleanText(el: string): string {
    return el.replace(/\n/, '').trim();
  }

  async parse({
    startPage,
    endPage,
  }: StartParseDto): Promise<{ words: string[]; translations: string[] }> {
    let hasMore = true;
    let page = startPage || 0;

    const words = [];
    const translations = [];

    while (hasMore) {
      const body = await this.client.makeRequest(page);
      const DOM = this.parser.load(body);

      const wordFromPage = DOM.getText(this.selectorWords).map(this.cleanText);

      if (wordFromPage.length && (endPage ? page <= endPage : true)) {
        page += 1;
      } else {
        hasMore = false;
        break;
      }

      words.push(...wordFromPage);

      translations.push(
        ...DOM.getText(this.selectorTranslations).map(this.cleanText),
      );

      Logger.debug(`Already parsed ${words.length} words`);
    }

    this.writer.saveWords(words.join('\n'));
    this.writer.saveTranslation(translations.join('\n'));

    Logger.debug(`Done!`);

    return {
      words,
      translations,
    };
  }
}
