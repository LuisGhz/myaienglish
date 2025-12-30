import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '@auth/services';
import { dispatch } from '@ngxs/store';
import { AuthActions } from '@st/auth/auth.actions';
import { NzInputModule } from 'ng-zorro-antd/input';
import { GenFormError } from 'src/app/shared/components/gen-form-error/gen-form-error';

interface LoginFormControls {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, NzInputModule, GenFormError],
  templateUrl: './login-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);
  readonly #authApi = inject(AuthApi);
  readonly #login = dispatch(AuthActions.Login);

  readonly form = this.#fb.nonNullable.group<LoginFormControls>({
    email: this.#fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.#fb.nonNullable.control('', [Validators.required]),
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAllAsDirty();
      return;
    }

    const value = this.form.getRawValue();
    try {
      const response = await this.#authApi.login(value);
      this.#login(response.accessToken).subscribe(() => {
        this.#router.navigateByUrl('/').then(() => window.location.reload());
      });
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}
