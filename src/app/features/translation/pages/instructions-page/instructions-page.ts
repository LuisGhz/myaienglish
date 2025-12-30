import {
  ChangeDetectionStrategy,
  Component,
  inject,
  effect,
  DestroyRef,
  ChangeDetectorRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { InstructionsApi } from '@transl/services/instructions-api';
import { Instruction } from '../../../../models/instruction';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface InstructionForm {
  id: FormControl<string>;
  name: FormControl<string>;
  content: FormControl<string>;
}

@Component({
  selector: 'app-instructions-page',
  imports: [NzInputModule, ReactiveFormsModule],
  templateUrl: './instructions-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstructionsPage {
  #instructionsApi = inject(InstructionsApi);
  #destroyRef = inject(DestroyRef);
  #cdr = inject(ChangeDetectorRef);

  $instructions = rxResource({
    defaultValue: [],
    stream: () => this.#instructionsApi.getInstructions(),
  });

  instructionsForm = new FormArray<FormGroup<InstructionForm>>([]);

  constructor() {
    // Initialize form when instructions are loaded
    effect(() => {
      const instructions = this.$instructions.value();
      if (instructions && instructions.length > 0 && this.instructionsForm.length === 0) {
        instructions.forEach((instruction) => {
          this.#addInstructionToForm(instruction);
        });
        this.#cdr.markForCheck();
      }
    });
  }

  addInstruction() {
    const existingNames = this.instructionsForm.controls
      .map((control) => control.value.name)
      .filter((name): name is string => !!name);
    const newName = this.#generateUniqueName(existingNames);

    const newInstruction: Instruction = {
      name: newName,
      content: '',
    };

    this.#instructionsApi.createInstruction(newInstruction).subscribe({
      next: (createdInstruction) => {
        this.#addInstructionToForm(createdInstruction);
        this.#cdr.markForCheck();
      },
    });
  }

  deleteInstruction(index: number) {
    const instruction = this.instructionsForm.at(index).value;
    if (instruction.id) {
      this.#instructionsApi.deleteInstruction(instruction.id).subscribe({
        next: () => {
          this.instructionsForm.removeAt(index);
          this.#cdr.markForCheck();
        },
      });
    }
  }

  #addInstructionToForm(instruction: Instruction) {
    const debounceTimeValue = 500;
    const formGroup = new FormGroup<InstructionForm>({
      id: new FormControl(instruction.id!, { nonNullable: true }),
      name: new FormControl(instruction.name, {
        nonNullable: true,
        validators: [Validators.required, this.#uniqueNameValidator.bind(this)],
      }),
      content: new FormControl(instruction.content, { nonNullable: true }),
    });

    // Auto-save name changes with debounce
    formGroup.controls.name.valueChanges
      .pipe(
        debounceTime(debounceTimeValue),
        distinctUntilChanged(),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((name) => {
        const id = formGroup.controls.id.value;
        if (formGroup.controls.name.valid && id) {
          this.#instructionsApi.updateInstruction(id, { name }).subscribe();
        }
      });

    // Auto-save content changes with debounce
    formGroup.controls.content.valueChanges
      .pipe(
        debounceTime(debounceTimeValue),
        distinctUntilChanged(),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((content) => {
        const id = formGroup.controls.id.value;
        if (id) {
          this.#instructionsApi.updateInstruction(id, { content }).subscribe();
        }
      });

    this.instructionsForm.push(formGroup);
  }

  #generateUniqueName(existingNames: string[]): string {
    const insNames = existingNames.filter((name) => name.startsWith('ins-'));
    const numbers = insNames.map((name) => {
      const match = name.match(/^ins-(\d+)$/);
      return match ? parseInt(match[1], 10) : 0;
    });

    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
    return `ins-${maxNumber + 1}`;
  }

  #uniqueNameValidator(control: AbstractControl): ValidationErrors | null {
    const currentName = control.value;
    const currentFormGroup = this.instructionsForm.controls.find(
      (group) => group.controls.name === control,
    );

    const isDuplicate = this.instructionsForm.controls.some(
      (group) => group !== currentFormGroup && group.controls.name.value === currentName,
    );

    return isDuplicate ? { uniqueName: true } : null;
  }
}
