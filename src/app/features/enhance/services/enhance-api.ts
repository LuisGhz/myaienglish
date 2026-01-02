import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnhanceTextReq } from '../models/enhance-text-req.model';
import { environment } from '@env/environment';
import { EnhanceTextRes } from '../models/enhance-text-res.model';
import { AddFavEnhanceReq } from '../models/add-fav-enhance-req.model';
import { FavEnhance } from '../models/fav-enhance.model';

@Injectable({
  providedIn: 'root',
})
export class EnhanceApi {
  #httpClient = inject(HttpClient);
  #baseUrl = `${environment.apiUrl}/enhance`;

  enhanceText({ textToEnhance, context }: EnhanceTextReq) {
    return this.#httpClient.post<EnhanceTextRes>(this.#baseUrl, {
      textToEnhance,
      context,
    });
  }
}
