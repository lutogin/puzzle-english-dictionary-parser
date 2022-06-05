import { Injectable } from '@nestjs/common';
import { PeClientService } from '../pe-client/pe-client.service';
import { JsDomService } from '../js-dom/js-dom.service';

@Injectable()
export class PeParserService {
  private SELECTOR_WORDS = '.puzzle-card__word .word-wrapper';
  private SELECTOR_TRANSLATIONS =
    '.puzzle-card__word .dict__video__list-table__word__translate.puzzle-text_fz_14.puzzle_mt_4';

  constructor(
    private readonly client: PeClientService,
    private readonly parser: JsDomService,
  ) {}

  private cleanText(el: string) {
    return el.replace(/\n/, '').trim();
  }

  async parse(): Promise<{ words: string[]; translations: string[] }> {
    const body = await this.client.makeRequest(1);
    const DOM = this.parser.load(body);
    const words = DOM.getText(this.SELECTOR_WORDS).map(this.cleanText);
    const translations = DOM.getText(this.SELECTOR_TRANSLATIONS).map(
      this.cleanText,
    );

    return {
      words,
      translations,
    };
  }
}
