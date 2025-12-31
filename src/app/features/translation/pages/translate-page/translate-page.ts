import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { MarkdownModule } from 'ngx-markdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InstructionsApi } from '@transl/services/instructions-api';
import { TranslateApi } from '@transl/services/translate-api';
import { TranslateTextReq } from '@transl/models/translate-text-req.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { of } from 'rxjs';
import { TranslateTextRes } from '@transl/models/translate-text-res.model';

@Component({
  selector: 'app-translate-page',
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    MarkdownModule,
  ],
  templateUrl: './translate-page.html',
  styleUrl: './translate-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatePage {
  #instructionsApi = inject(InstructionsApi);
  #translateApi = inject(TranslateApi);
  #formBuilder = inject(FormBuilder);

  $instructions = rxResource({
    defaultValue: [],
    stream: () => of([]),
  });

  translateForm = this.#formBuilder.group({
    instructionId: [''],
    context: [''],
    textToTranslate: ['', Validators.required],
  });

  translatedText = signal<TranslateTextRes | null>(null);
  isLoading = signal<boolean>(false);
  isFavoriteClicked = signal<boolean>(false);

  onTranslate(): void {
    if (this.translateForm.invalid || this.isLoading()) return;

    const { context, textToTranslate } = this.translateForm.getRawValue();

    const request: TranslateTextReq = {
      textToTranslate: textToTranslate || '',
      context: context || undefined,
    };

    this.isLoading.set(true);
    this.#translateApi.translateText(request).subscribe({
      next: (response) => {
        if (response) this.translatedText.set(response);

        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
