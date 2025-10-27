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
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-sider',
  imports: [RouterLink, NzIconModule],
  templateUrl: './sider.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sider {
  private readonly MOBILE_BREAKPOINT = 768;

  readonly isCollapsed = signal(false);
  readonly isMobile = signal(false);
  readonly collapsedChange = output<boolean>();

  readonly collapseIcon = computed(() => (this.isCollapsed() ? 'right' : 'left'));

  constructor() {
    // Initialize mobile state
    this.checkMobileView();

    // Listen to window resize
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.checkMobileView());
    }

    // Emit collapsed state changes
    effect(() => {
      this.collapsedChange.emit(this.isCollapsed());
    });
  }

  private checkMobileView(): void {
    if (typeof window === 'undefined') return;

    const mobile = window.innerWidth < this.MOBILE_BREAKPOINT;
    this.isMobile.set(mobile);

    // Auto-collapse on mobile, auto-expand on desktop
    this.isCollapsed.set(mobile);
  }

  toggleCollapse(): void {
    this.isCollapsed.update((collapsed) => !collapsed);
  }
}
