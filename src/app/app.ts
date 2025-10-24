import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Sider } from './components/sider/sider';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutModule, Sider],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
