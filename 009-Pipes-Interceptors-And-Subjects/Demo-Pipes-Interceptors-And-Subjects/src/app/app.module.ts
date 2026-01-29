import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent, DieselEngine, PetrolEngine} from './app.component';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {DefaultViewComponent} from "./pages/default-view/default-view.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {LoginComponent} from "./pages/login/login.component";
import {CustomForms} from "./custom-forms/custom-forms.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";

export const ENGINE_TOKEN = new InjectionToken('Services for engine');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    DefaultViewComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    CustomForms
  ],
  providers: [
    {
      provide: ENGINE_TOKEN,
      useClass: PetrolEngine,
      multi: true
    },
    {
      provide: ENGINE_TOKEN,
      useClass: DieselEngine,
      multi: true // makes array of providers, if false -> overwrite
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
