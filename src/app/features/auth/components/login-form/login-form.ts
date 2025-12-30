import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

interface LoginFormControls {
  email: FormControl<string>;
  password: FormControl<string>;
}

interface LoginFormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, NzInputModule],
  templateUrl: './login-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  readonly #fb = inject(FormBuilder);

  readonly form = this.#fb.nonNullable.group<LoginFormControls>({
    email: this.#fb.nonNullable.control(''),
    password: this.#fb.nonNullable.control(''),
  });
}
