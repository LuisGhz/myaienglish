import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateApi } from '../../services/translate-api';
import { rxResource } from '@angular/core/rxjs-interop';
import { MarkdownModule } from 'ngx-markdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FavTranslation } from '../../models/fav-translation.model';

@Component({
  selector: 'app-fav-translations-page',
  imports: [MarkdownModule, NzIconModule],
  templateUrl: './fav-translations-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavTranslationsPage {
  #translateApi = inject(TranslateApi);
  $favTranslations = rxResource({
    defaultValue: [],
    stream: () => this.#translateApi.getFavoriteTranslations(),
  });

  removeFavoriteTranslation(id: string): void {
    this.#translateApi.removeFavoriteTranslation(id).subscribe(() => {
      this.$favTranslations.update((translations) => translations.filter((t) => t.id !== id));
    });
  }
}
