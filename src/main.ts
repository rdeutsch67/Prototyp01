import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { LOCALE_ID, TRANSLATIONS_FORMAT, TRANSLATIONS, enableProdMode } from '@angular/core';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));




