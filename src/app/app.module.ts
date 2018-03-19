import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthService } from './../providers/auth.service';
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { ChatPage } from './../pages/chat/chat';
import { ChatService } from './../providers/chat.service';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { MessageService } from './../providers/message.service';
import { HistoricoClinicoPage } from './../pages/historico-clinico/historico-clinico';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { ProgressBarComponent } from './../components/progress-bar/progress-bar.component';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';
import { SinaisInfartoPage } from './../pages/sinais-infarto/sinais-infarto';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserService } from './../providers/user.service';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAh6kEb5yhJvktOBJtulIBxdSzxB1tmv_M",
  authDomain: "sos-infarto.firebaseapp.com",
  databaseURL: "https://sos-infarto.firebaseio.com",
  storageBucket: "sos-infarto.appspot.com",
  messagingSenderId: "847649556567"
};

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    HistoricoClinicoPage,
    MessageBoxComponent,
    MyApp,
    ProgressBarComponent,
    SigninPage,
    SignupPage,
    SinaisInfartoPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    HistoricoClinicoPage,
    MyApp,
    SigninPage,
    SignupPage,
    SinaisInfartoPage,
    UserProfilePage
  ],
  providers: [
    AuthService,
    ChatService,
    MessageService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
