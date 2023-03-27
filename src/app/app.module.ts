import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAnNFw1Kkvg0edhMfBs_2Me_cbYqtoK_a0',
      authDomain: 'my-profile-app-f98bf.firebaseapp.com',
      projectId: 'my-profile-app-f98bf',
      storageBucket: 'my-profile-app-f98bf.appspot.com',
      messagingSenderId: '919145805120',
      appId: '1:919145805120:web:92876ab82b116dd252f6a5',
      measurementId: 'G-NY1NM3RVKG',
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
