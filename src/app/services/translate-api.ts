import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateTextReq } from '../models/translate-text-req.model';
import { environment } from '../../environments/environment';
import { TranslateTextRes } from '../models/translate-text-res.model';
import { AddFavTranslationReq } from '../models/add-fav-translation-req.model';

@Injectable({
  providedIn: 'root',
})
export class TranslateApi {
  #httpClient = inject(HttpClient);

  translateText({ instructionId, textToTranslate, context }: TranslateTextReq) {
    return this.#httpClient.post<TranslateTextRes>(`${environment.apiUrl}/translate`, {
      instructionId,
      textToTranslate,
      context,
    });
  }

  addFavoriteTranslation(translation: AddFavTranslationReq) {
    return this.#httpClient.post(`${environment.apiUrl}/favorites/translations`, translation);
  }
}
