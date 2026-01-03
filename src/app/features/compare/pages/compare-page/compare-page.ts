import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CompareApi } from '../../services/compare-api';
import { CompareResModel } from '../../models';

@Component({
  selector: 'app-compare-page',
  imports: [ReactiveFormsModule, NzInputModule, NzIconModule],
  templateUrl: './compare-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparePage {
  readonly #formBuilder = inject(FormBuilder);
  readonly #compareApi = inject(CompareApi);
  readonly compareForm = this.#formBuilder.group({
    inputs: this.#formBuilder.array([this.input, this.input]),
    context: this.#formBuilder.nonNullable.control(''),
  });
  readonly result = signal<CompareResModel | null>(null);

  get inputs() {
    return this.compareForm.get('inputs') as FormArray;
  }

  get input() {
    return this.#formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(1),
    ]);
  }

  addInput() {
    this.inputs.push(this.input);
  }

  async onSend() {
    if (this.compareForm.valid) {
      const formValue = this.compareForm.value;
      const res = await this.#compareApi.compare(formValue.inputs!, formValue.context);
      this.result.set(res);
    }
  }
}
