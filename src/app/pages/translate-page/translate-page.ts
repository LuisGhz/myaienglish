import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-translate-page',
  imports: [FormsModule, NzSelectModule, NzInputModule],
  templateUrl: './translate-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatePage {
  instructions = signal<{ text: string; id: string }[]>([
    {
      id: 'how-to-say',
      text: 'How to say...',
    },
    {
      id: 'improve-my-writing',
      text: 'Improve my writing',
    },
  ]);
}
