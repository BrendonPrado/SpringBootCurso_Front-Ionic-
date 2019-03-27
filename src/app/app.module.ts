import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {CategoriaService} from '../service/domain/categoria.service';
import {ErrorInterceptorProvider} from '../interceptors/error-interceptor';
import {AuthService} from '../service/auth.service';
import {StorageService} from '../service/storage.service';
import {ClienteService} from '../service/cliente.service';
import {AuthInterceptorProvider} from '../interceptors/auth-interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CategoriaService,
    AuthService,
    StatusBar,
    SplashScreen,
    StorageService,
    ClienteService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
