import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DashboardModule} from "./pages/dashboard/dashboard.module";
import { AuthorisedComponent } from './shared/components/layouts/authorised/authorised.component';
import {SharedComponentsModule} from "./shared/components/shared-components.module";
import {AuthModule} from "./pages/auth/auth.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpInterceptorProviders} from "./shared/interceptors/interceptors";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthorisedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    AuthModule,
    SharedComponentsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
