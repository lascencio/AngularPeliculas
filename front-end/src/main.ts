import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule) //bootstarp -> expresion en Ingles para arrancar o iniciar. Este método es para arrancar la aplicación
  .catch(err => console.error(err));
