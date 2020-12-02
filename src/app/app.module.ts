import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CustomersModule } from './features/customers/customers.module';
import { AppConfig } from './tools/AppConfig';
import { AppInitializer } from './tools/AppInitializer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    CustomersModule
  ],
  providers: [
    AppConfig,
    AppInitializer,
    {	//appinnitialazer
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializer) => () => appInitializer.init(),
      deps: [AppInitializer],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
