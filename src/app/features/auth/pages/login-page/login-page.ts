import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginForm } from '@auth/components/login-form/login-form';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, LoginForm],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {

}
