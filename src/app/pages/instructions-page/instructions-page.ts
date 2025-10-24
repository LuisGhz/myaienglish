import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-instructions-page',
  imports: [NzInputModule],
  templateUrl: './instructions-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstructionsPage {}
