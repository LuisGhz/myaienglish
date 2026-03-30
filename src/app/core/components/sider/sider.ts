import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { dispatch, select } from '@ngxs/store';
import { AppActions } from '@st/app/app.actions';
import { AppStore } from '@st/app/app.store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-sider',
  imports: [RouterLink, RouterLinkActive, NzIconModule],
  templateUrl: './sider.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sider {
  readonly #authService = inject(AuthService);
  readonly isCollapsed = select(AppStore.isMenuCollapsed);
  readonly isMobile = select(AppStore.isMobile);
  readonly #toggleMenu = dispatch(AppActions.ToggleMenu);
  readonly #collapse = dispatch(AppActions.CollapseMenu);

  toggleCollapse(): void {
    this.#toggleMenu();
  }

  collapseIfMobile(): void {
    if (this.isMobile()) {
      setTimeout(() => {
        this.#collapse();
      }, 100);
    }
  }

  logout(): void {
    this.#authService.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
