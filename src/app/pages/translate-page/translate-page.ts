import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { MarkdownModule } from 'ngx-markdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InstructionsApi } from '../../services/instructions-api';
import { TranslateApi } from '../../services/translate-api';
import { TranslateTextReq } from '../../models/translate-text-req.model';

@Component({
  selector: 'app-translate-page',
  imports: [ReactiveFormsModule, NzSelectModule, NzInputModule, MarkdownModule],
  templateUrl: './translate-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatePage {
  #instructionsApi = inject(InstructionsApi);
  #translateApi = inject(TranslateApi);
  #formBuilder = inject(FormBuilder);

  $instructions = rxResource({
    defaultValue: [],
    stream: () => this.#instructionsApi.getInstructions(),
  });

  translateForm = this.#formBuilder.group({
    instructionId: ['', Validators.required],
    context: [''],
    textToTranslate: ['', Validators.required],
  });

  translatedText = signal<string>('');
  isLoading = signal<boolean>(false);
  tokenInfo = signal<{ inputTokens: number; outputTokens: number; totalTokens: number } | null>(
    null
  );

  onTranslate(): void {
    if (this.translateForm.invalid) {
      return;
    }

    const { instructionId, context, textToTranslate } = this.translateForm.getRawValue();

    const request: TranslateTextReq = {
      instructionId: instructionId || '',
      textToTranslate: textToTranslate || '',
      context: context || undefined,
    };

    this.isLoading.set(true);
    this.#translateApi.translateText(request).subscribe({
      next: (response) => {
        this.translatedText.set(response.translatedText);
        this.tokenInfo.set({
          inputTokens: response.inputTokens,
          outputTokens: response.outputTokens,
          totalTokens: response.totalTokens,
        });
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
