import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthApi } from '@auth/services';
import { dispatch, select } from '@ngxs/store';
import { AppActions } from '@st/app/app.actions';
import { AppStore } from '@st/app/app.store';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-sider',
  imports: [RouterLink, NzIconModule],
  templateUrl: './sider.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sider {
  readonly #authApi = inject(AuthApi);
  readonly isCollapsed = select(AppStore.isMenuCollapsed);
  readonly #collapse = dispatch(AppActions.CollapseMenu);

  readonly isMobile = signal(false);

  toggleCollapse(): void {
    this.#collapse();
  }

  collapseIfMobile(): void {
    if (this.isMobile()) {
      setTimeout(() => {
        this.#collapse();
      }, 100);
    }
  }

  async logout() {
    await this.#authApi.logout();
  }
}
