import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { NotificationModule } from './services/notification/notification.module';

const APP_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' },
    },
    display: {
        dateInput: { day: 'numeric', month: 'short', year: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' }
    }
};
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotificationModule.forRoot(),
  
    BrowserAnimationsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAnNFw1Kkvg0edhMfBs_2Me_cbYqtoK_a0',
      authDomain: 'my-profile-app-f98bf.firebaseapp.com',
      projectId: 'my-profile-app-f98bf',
      storageBucket: 'my-profile-app-f98bf.appspot.com',
      messagingSenderId: '919145805120',
      appId: '1:919145805120:web:92876ab82b116dd252f6a5',
      measurementId: 'G-NY1NM3RVKG',
     
    }
    ),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatNativeDateModule,


    StoreModule.forRoot(reducers, {
      runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
      }
  }),
  EffectsModule.forRoot(effects),

  StoreDevtoolsModule.instrument({
    maxAge: 25, // Retains last 25 states
    logOnly: environment.production, // Restrict extension to log-only mode
    autoPause: true, // Pauses recording actions and state changes when the extension window is not open
  }),
    
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
