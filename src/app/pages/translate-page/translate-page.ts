import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InstructionsApi } from '../../services/instructions-api';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-translate-page',
  imports: [FormsModule, NzSelectModule, NzInputModule],
  templateUrl: './translate-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatePage {
  #instructionsApi = inject(InstructionsApi);
  $instructions = rxResource({
    defaultValue: [],
    stream: () => this.#instructionsApi.getInstructions(),
  });
}
