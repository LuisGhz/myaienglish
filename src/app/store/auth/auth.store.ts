import { Selector, State } from '@ngxs/store';
import { AuthStoreModel } from './models';

@State<AuthStoreModel>({
  name: 'auth',
  defaults: {
    isAuthenticated: false,
    token: null,
  },
})
export class AuthStore {
  @Selector()
  static isAuthenticated(state: AuthStoreModel): boolean {
    return state.isAuthenticated;
  }
}
