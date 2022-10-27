import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { PhotoState } from './state/photo.state';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxsModule } from '@ngxs/store';
import { PhotoService } from './sevices/photo.service';
import {HttpClientModule} from '@angular/common/http';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { PhotoPageComponent } from './pages/photo-page/photo-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    PhotoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([
      PhotoState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MdbCollapseModule,
    MdbModalModule

  ],
  providers: [
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
