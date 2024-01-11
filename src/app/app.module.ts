import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth';
import { ComponentsComponent } from './login';
import { MaterialModule } from './material';
import { RegistrarComponent } from './registrar';


@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    RegistrarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
