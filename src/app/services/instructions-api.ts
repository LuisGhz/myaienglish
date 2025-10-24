import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Instruction } from '../models/instruction';

@Injectable({
  providedIn: 'root',
})
export class InstructionsApi {
  #httpClient = inject(HttpClient);

  getInstructions() {
    return this.#httpClient.get<Instruction[]>(`${environment.apiUrl}/instructions`);
  }
}
