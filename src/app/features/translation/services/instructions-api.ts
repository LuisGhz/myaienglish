import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Instruction } from '../models/instruction';

@Injectable({
  providedIn: 'root',
})
export class InstructionsApi {
  #httpClient = inject(HttpClient);
  #baseUrl = `${environment.apiUrl}/instructions`;

  getInstructions() {
    return this.#httpClient.get<Instruction[]>(this.#baseUrl);
  }

  createInstruction(instruction: Instruction) {
    return this.#httpClient.post<Instruction>(this.#baseUrl, instruction);
  }

  updateInstruction(id: string, updates: Partial<Instruction>) {
    return this.#httpClient.patch<Instruction>(
      `${this.#baseUrl}/${id}/update`,
      updates
    );
  }

  deleteInstruction(id: string) {
    return this.#httpClient.delete<void>(`${this.#baseUrl}/${id}/delete`);
  }
}
