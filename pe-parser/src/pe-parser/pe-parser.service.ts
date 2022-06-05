import { Injectable, Logger } from '@nestjs/common';
import { PeClientService } from '../pe-client/pe-client.service';
import { JsDomService } from '../js-dom/js-dom.service';
import { DataSaverService } from '../data-saver/data-saver.service';

@Injectable()
export class PeParserService {
  private SELECTOR_WORDS = '.puzzle-card__word .word-wrapper';
  private SELECTOR_TRANSLATIONS =
    '.puzzle-card__word .dict__video__list-table__word__translate.puzzle-text_fz_14.puzzle_mt_4';

  constructor(
    private readonly client: PeClientService,
    private readonly parser: JsDomService,
    private readonly writer: DataSaverService,
  ) {}

  private cleanText(el: string): string {
    return el.replace(/\n/, '').trim();
  }

  async parse(): Promise<{ words: string[]; translations: string[] }> {
    let hasMore = true;
    let page = 1;

    const words = [];
    const translations = [];

    while (hasMore) {
      const body = await this.client.makeRequest(page);
      const DOM = this.parser.load(body);

      const wordFromPage = DOM.getText(this.SELECTOR_WORDS).map(this.cleanText);

      if (wordFromPage.length) {
        page += 1;
      } else {
        hasMore = false;
        break;
      }

      words.push(...wordFromPage);

      translations.push(
        ...DOM.getText(this.SELECTOR_TRANSLATIONS).map(this.cleanText),
      );

      Logger.debug(`Already parsed ${words.length} words`);
    }

    this.writer.saveWords(words.join('\n'));
    this.writer.saveTranslation(translations.join('\n'));

    return {
      words,
      translations,
    };
  }
}
