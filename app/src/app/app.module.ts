import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPermissionsModule } from 'ngx-permissions';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ThemeModule } from '@theme/theme.module';
import { SharedModule } from '@shared/shared.module';
import { RoutesModule } from './routes/routes.module';

import { appInitializerProviders } from '@core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    ThemeModule,
    RoutesModule,
    SharedModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    appInitializerProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
