import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as querystring from 'querystring';

enum ApiPath {
  GetDictionary = 'change-my-dictionary',
}

@Injectable()
export class PeClientService {
  baseApiPath =
    this.configService.get('BASE_API_PATH') || 'https://puzzle-english.com';

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private getBody(page = 1): string {
    const body = {
      for_dictionary_change: true,
      ajax_action: 'ajax_pe_get_next_page_dictionary',
      page: page,
    };

    return new URLSearchParams(body as Record<string, any>).toString();
  }

  private getClientConfig(): AxiosRequestConfig {
    return {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Connection: 'keep-alive',
        Cookie: this.configService.get<string>('COOKIE'),
      },
    };
  }

  async makeRequest(page: number): Promise<string> {
    return this.httpService
      .post(
        `${this.baseApiPath}/${ApiPath.GetDictionary}`,
        this.getBody(page),
        this.getClientConfig(),
      )
      .pipe(map((resp) => (resp as AxiosResponse).data.listWords))
      .toPromise();
  }
}
