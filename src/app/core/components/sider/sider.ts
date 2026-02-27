import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { dispatch } from '@ngxs/store';
import { AppActions } from '@st/app/app.actions';
import { AppStore } from '@st/app/app.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '@auth0/auth0-angular';
import { select } from '@ngxs/store';

@Component({
  selector: 'app-sider',
  imports: [RouterLink, NzIconModule],
  templateUrl: './sider.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sider {
  readonly #authService = inject(AuthService);
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

  logout() {
    this.#authService.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
