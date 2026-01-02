import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Sider } from '@core/components/sider/sider';
import { dispatch, select } from '@ngxs/store';
import { AuthStore } from './store/auth/auth.store';
import { AppStore } from '@st/app/app.store';
import { AppActions } from '@st/app/app.actions';
import { Header } from '@core/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutModule, Sider, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  readonly #breakpointObserver = inject(BreakpointObserver);
  readonly #collapse = dispatch(AppActions.CollapseMenu);
  readonly #expand = dispatch(AppActions.ExpandMenu);
  readonly #updateIsMobile = dispatch(AppActions.UpdateIsMobile);
  readonly #mobileQuery = '(max-width: 991px)';
  readonly isCollapsed = select(AppStore.isMenuCollapsed);
  readonly isAuthenticated = select(AuthStore.isAuthenticated);
  readonly isMobile = select(AppStore.isMobile);
  readonly collapsedWidth = signal(0);
  readonly expandedWidth = signal(200);

  ngOnInit(): void {
    this.#breakpointObserver.observe(this.#mobileQuery).subscribe((result) => {
      if (result.matches) {
        this.#updateIsMobile(true);
        this.#collapse();
      } else {
        this.#updateIsMobile(false);
        this.#expand();
      }
    });
  }

  collapseFromBackdrop(): void {
    this.#collapse();
  }
}
