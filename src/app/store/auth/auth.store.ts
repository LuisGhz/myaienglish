import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { jwtDecode } from 'jwt-decode';
import { AuthStoreModel, JwtPayloadModel } from './models';
import { AuthActions } from './auth.actions';

@State<AuthStoreModel>({
  name: 'auth',
  defaults: {
    isAuthenticated: false,
    token: null,
  },
})
@Injectable()
export class AuthStore {
  @Selector()
  static isAuthenticated(state: AuthStoreModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static token(state: AuthStoreModel): string | null {
    return state.token;
  }

  @Selector()
  static email(state: AuthStoreModel): string | null {
    if (!state.token) return null;
    const payload = jwtDecode<JwtPayloadModel>(state.token);
    return payload.email;
  }

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStoreModel>, action: AuthActions.Login) {
    ctx.setState({
      isAuthenticated: true,
      token: action.payload,
    });
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStoreModel>) {
    ctx.setState({
      isAuthenticated: false,
      token: null,
    });
  }

  @Action(AuthActions.UpdateToken)
  updateToken(ctx: StateContext<AuthStoreModel>, action: AuthActions.UpdateToken) {
    ctx.patchState({
      token: action.payload,
    });
  }
}
