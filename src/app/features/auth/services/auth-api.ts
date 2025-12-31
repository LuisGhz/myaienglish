import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginReqModel, LoginResModel, RegisterReqModel, RegisterResModel } from '@auth/models';
import { HttpService } from '@core/services/http.service';
import { dispatch } from '@ngxs/store';
import { AuthActions } from '@st/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthApi extends HttpService {
  readonly #logout = dispatch(AuthActions.Logout);
  readonly #router = inject(Router);

  register(data: RegisterReqModel) {
    return this.postP<RegisterResModel, RegisterReqModel>('/auth/register', data);
  }

  login(data: LoginReqModel) {
    return this.postP<LoginResModel, LoginReqModel>('/auth/login', data);
  }

  async logout() {
    await this.postP<void, unknown>('/auth/logout', {});
    this.#logout();
    this.#router.navigate(['/auth/login']);
  }
}
