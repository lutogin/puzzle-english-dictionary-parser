import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { ConfigService } from '@nestjs/config';

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

  private getClientConfig(page = 1): AxiosRequestConfig {
    return {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        Accept: '*/*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Connection: 'keep-alive',
        cookie: this.configService.get<string>('COOKIE'),
      },
      data: {
        for_dictionary_change: true,
        ajax_action: 'ajax_pe_get_next_page_dictionary',
        page: page,
      },
    };
  }

  async makeRequest(page: number): Promise<string> {
    return this.httpService
      .get(
        `${this.baseApiPath}/${ApiPath.GetDictionary}`,
        this.getClientConfig(page),
      )
      .pipe(map((resp) => (resp as AxiosResponse).data))
      .toPromise();
  }
}
