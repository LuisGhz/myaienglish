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

  createInstruction(instruction: Instruction) {
    return this.#httpClient.post<Instruction>(`${environment.apiUrl}/instructions`, instruction);
  }

  updateInstruction(id: string, updates: Partial<Instruction>) {
    return this.#httpClient.patch<Instruction>(
      `${environment.apiUrl}/instructions/${id}/update`,
      updates
    );
  }

  deleteInstruction(id: string) {
    return this.#httpClient.delete<void>(`${environment.apiUrl}/instructions/${id}/delete`);
  }
}
