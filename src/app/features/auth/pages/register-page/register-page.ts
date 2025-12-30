import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterForm } from '@auth/components/register-form/register-form';

@Component({
  selector: 'app-register-page',
  imports: [RegisterForm],
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {}
