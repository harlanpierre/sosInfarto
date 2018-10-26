import { AlterarSenhaPage } from './../pages/alterar-senha/alterar-senha';
import { PrevencaoPage } from './../pages/prevencao/prevencao';
import { SaibaMaisPage } from './../pages/saiba-mais/saiba-mais';
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
import { ContatosPage } from './../pages/contatos/contatos';
import { ChatService } from './../providers/chat.service';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { MessageService } from './../providers/message.service';
import { HistoricoClinicoPage } from './../pages/historico-clinico/historico-clinico';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { ProgressBarComponent } from './../components/progress-bar/progress-bar.component';
import { PrincipalPage } from './../pages/principal/principal';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';
import { SinaisInfartoPage } from './../pages/sinais-infarto/sinais-infarto';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserService } from './../providers/user.service';
import { MapPage } from '../pages/map/map';

import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { IonMaskModule } from '@pluritech/ion-mask';
import { SobrePage } from '../pages/sobre/sobre';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAh6kEb5yhJvktOBJtulIBxdSzxB1tmv_M",
  authDomain: "sos-infarto.firebaseapp.com",
  databaseURL: "https://sos-infarto.firebaseio.com",
  storageBucket: "sos-infarto.appspot.com",
  messagingSenderId: "847649556567"
};

@NgModule({
  declarations: [
    AlterarSenhaPage,
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    ContatosPage,
    HomePage,
    HistoricoClinicoPage,
    MessageBoxComponent,
    MyApp,
    MapPage,
    ProgressBarComponent,
    PrincipalPage,
    SaibaMaisPage,
    SigninPage,
    SignupPage,
    SobrePage,
    SinaisInfartoPage,
    RecuperarSenhaPage,
    PrevencaoPage,
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
    IonicModule.forRoot(MyApp),
    IonMaskModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AlterarSenhaPage,
    ChatPage,
    ContatosPage,
    HomePage,
    HistoricoClinicoPage,
    MyApp,
    PrincipalPage,
    SaibaMaisPage,
    SigninPage,
    SignupPage,
    SinaisInfartoPage,
    SobrePage,
    PrevencaoPage,
    UserProfilePage,
    RecuperarSenhaPage,
    MapPage
  ],
  providers: [
    AuthService,
    ChatService,
    MessageService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    CallNumber
  ]
})
export class AppModule {}
