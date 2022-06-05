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
        Cookie:
          'language_selected=ru; guest_id_int=16325749552941423; user_language=ru; undefined=undefined; amo-livechat-id=uO0n0f6MLIq7VZaZ1JQU6; _ga=GA1.2.696221981.1632814351; _ym_uid=1632814351368438692; _ym_d=1632814351; cto_bundle=46ixVl91SmNzY2ZRNDdzOGNMbHR6Z1dDaUlUSlRBYVllQ2NGMnBxQjAwOEVTZkVSSzduTnlYTks3QTF1VDc4QW5wSDRJVW93cGlBdE9ORmZMQkQwSWRqSGIwYXVwUDh6UWclMkZuc2M2ODRXbkVXVFA3eXYyJTJCTHVqaHMwWVpzTU9UWVJTOFpvQk1naUJuTzg5blBySG5BeTlERW5DYWRGdnAwdUlYN0V1eGtvS1V2THpzdUlUYnBEUHAwUXlpamJMaXZNMExjQmRieTAydXVWNVRZZjNsWU5HOVUyQSUzRCUzRA; amp_fdb811=WQrvO067T-rkz-zSmTIRyX.MTAwNTQ0MTc=..1fgs003ro.1fgs1hg0c.e.1.f; last_login=lutogin.v8%40gmail.com; tg_promotion-split-test=b; tg_mentors-banner-2022-02=b; wp_logged_in_cookie=Lutogin.v8%40gmail.com%7C1654435199%7CMJfSieUxh6OlmUhgEkNWsKZxeiQ8B9V0lI3LVRt0OdW%7C8bd7e8071f42b661d85fe34bbf4827b1c093099f9f79a2d69295236c9d7ab7c8; PHPSESSID=033db3b7eccdc29bf2538950a861f0c7; sort_dictionary=eyJ2aWV3IjoidGFibGUiLCJpdGVtIjoid29yZCIsInNvcnQiOjF9',
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
