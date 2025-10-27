import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Sider } from './components/sider/sider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutModule, Sider],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly isCollapsed = signal(false);

  onCollapsedChange(collapsed: boolean): void {
    this.isCollapsed.set(collapsed);
  }
}
