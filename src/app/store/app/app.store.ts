import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppStoreModel } from './models';
import { Injectable } from '@angular/core';
import { AppActions } from './app.actions';

@State<AppStoreModel>({
  name: 'app',
  defaults: {
    isMenuCollapsed: false,
  },
})
@Injectable()
export class AppStore {
  @Selector()
  static isMenuCollapsed(state: AppStoreModel) {
    return state.isMenuCollapsed;
  }

  @Action(AppActions.CollapseMenu)
  setMenuCollapsed(ctx: StateContext<AppStoreModel>) {
    ctx.patchState({ isMenuCollapsed: true });
  }

  @Action(AppActions.ExpandMenu)
  setMenuExpanded(ctx: StateContext<AppStoreModel>) {
    ctx.patchState({ isMenuCollapsed: false });
  }
}
