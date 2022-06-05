import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';

@Injectable()
export class JsDomService {
  private readonly jsdom: any;
  public dom;

  constructor() {
    this.jsdom = JSDOM;
  }

  load(html: string): JsDomService {
    this.dom = new this.jsdom(html);
    return this;
  }

  getText(selector: string): string[] {
    const result = [];
    this.dom.window.document.querySelectorAll(selector).forEach((el) => {
      result.push(el.textContent);
    });

    return result;
  }
}
