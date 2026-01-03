import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { MarkdownModule } from 'ngx-markdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EnhanceApi } from '@enhance/services/enhance-api';
import { EnhanceTextReq } from '@enhance/models/enhance-text-req.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { of } from 'rxjs';
import { EnhanceTextRes } from '@enhance/models/enhance-text-res.model';

@Component({
  selector: 'app-enhance-page',
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    MarkdownModule,
  ],
  templateUrl: './enhance-page.html',
  styleUrl: './enhance-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnhancePage {
  #enhanceApi = inject(EnhanceApi);
  #formBuilder = inject(FormBuilder);

  enhanceForm = this.#formBuilder.group({
    instructionId: [''],
    context: [''],
    textToEnhance: ['', Validators.required],
  });

  enhancedText = signal<EnhanceTextRes | null>(null);
  isLoading = signal<boolean>(false);
  isFavoriteClicked = signal<boolean>(false);

  onEnhance(): void {
    if (this.enhanceForm.invalid || this.isLoading()) return;

    const { context, textToEnhance } = this.enhanceForm.getRawValue();

    const request: EnhanceTextReq = {
      textToEnhance: textToEnhance || '',
      context: context || undefined,
    };

    this.isLoading.set(true);
    this.#enhanceApi.enhanceText(request).subscribe({
      next: (response) => {
        if (response) this.enhancedText.set(response);

        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
