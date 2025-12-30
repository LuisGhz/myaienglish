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

  translateText({ instructionId, textToTranslate, context }: TranslateTextReq) {
    return this.#httpClient.post<TranslateTextRes>(this.#baseUrl, {
      instructionId,
      textToTranslate,
      context,
    });
  }

  getFavoriteTranslations() {
    return this.#httpClient.get<FavTranslation[]>(`${this.#baseUrl}/favorites`);
  }

  addFavoriteTranslation(translation: AddFavTranslationReq) {
    return this.#httpClient.post(`${this.#baseUrl}/favorites`, translation);
  }

  removeFavoriteTranslation(id: string) {
    return this.#httpClient.delete(`${this.#baseUrl}/favorites/${id}/delete`);
  }
}
