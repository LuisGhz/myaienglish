import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateTextReq } from '../models/translate-text-req.model';
import { environment } from '../../environments/environment';
import { TranslateTextRes } from '../models/translate-text-res.model';
import { AddFavTranslationReq } from '../models/add-fav-translation-req.model';
import { FavTranslation } from '../models/fav-translation.model';

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

  getFavoriteTranslations() {
    return this.#httpClient.get<FavTranslation[]>(`${environment.apiUrl}/favorites/translations`);
  }

  addFavoriteTranslation(translation: AddFavTranslationReq) {
    return this.#httpClient.post(`${environment.apiUrl}/favorites/translations`, translation);
  }

  removeFavoriteTranslation(id: string) {
    return this.#httpClient.delete(`${environment.apiUrl}/favorites/translations/${id}/delete`);
  }
}
