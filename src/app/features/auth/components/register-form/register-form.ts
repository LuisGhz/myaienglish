import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '@auth/services';
import { passwordMatchValidator } from '@auth/validators/password-match.validator';
import { strongPasswordValidator } from '@auth/validators/strong-password.validator';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { GenFormError } from 'src/app/shared/components/gen-form-error/gen-form-error';

interface RegisterFormModel {
  fullName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RouterLink, NzInputModule, NzButtonModule, GenFormError],
  templateUrl: './register-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm {
  readonly #form = inject(FormBuilder);
  readonly #router = inject(Router);
  readonly #authApi = inject(AuthApi);
  readonly formGroup = this.#form.group<RegisterFormModel>(
    {
      fullName: this.#form.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S+/), Validators.minLength(3)],
      }),
      email: this.#form.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S+/), Validators.email],
      }),
      password: this.#form.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S+/), strongPasswordValidator],
      }),
      confirmPassword: this.#form.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S+/)],
      }),
    },
    {
      validators: [passwordMatchValidator('password', 'confirmPassword')],
    },
  );

  async onSubmit() {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      try {
        await this.#authApi.register({
          fullName: formValue.fullName!,
          email: formValue.email!,
          password: formValue.password!,
          confirmPassword: formValue.confirmPassword!,
        });
        this.#router.navigate(['/auth/login']);
      } catch (error) {
        console.error('Registration failed', error);
      }
    }
  }
}
