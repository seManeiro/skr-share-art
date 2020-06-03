
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from "@clr/angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {config } from '../environments/environment';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { CompleteViewComponent } from './components/views/complete-view/complete-view.component';
import { MainViewComponent } from './components/views/main-view/main-view.component'

import { AuthService } from './services/auth.service';
import { ArticleService } from './services/article.service';
import  { AuthGuard } from './services/auth-guard.service';
import { FirebaseService } from './services/firebase.service';
import { ArticleFormComponent } from './components/form/article-form.component';
import { EditArticleComponent } from './components/form/edit-article/edit-article.component';
import { FilteredViewComponent } from './components/views/filtered-view/filtered-view.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { FilterArticlePipe } from './common/pipe/filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignInComponent,
    MainViewComponent,
    ArticleFormComponent,
    CompleteViewComponent,
    EditArticleComponent,
    FilteredViewComponent,
    SignUpComponent,
    FilterArticlePipe

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    

  ],
  providers: [
    FirebaseService,
    AuthService,
    AuthGuard,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
