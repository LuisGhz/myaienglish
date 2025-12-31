import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateTextReq } from '../models/translate-text-req.model';
import { environment } from '@env/environment';
import { TranslateTextRes } from '../models/translate-text-res.model';
import { AddFavTranslationReq } from '../models/add-fav-translation-req.model';
import { FavTranslation } from '../models/fav-translation.model';

@Injectable({
  providedIn: 'root',
})
export class TranslateApi {
  #httpClient = inject(HttpClient);
  #baseUrl = `${environment.apiUrl}/translate`;

  translateText({ textToTranslate, context }: TranslateTextReq) {
    return this.#httpClient.post<TranslateTextRes>(this.#baseUrl, {
      textToTranslate,
      context,
    });
  }
}
