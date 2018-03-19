import { Component, Input } from '@angular/core';
import { AlertController, App, MenuController } from 'ionic-angular';

import { AuthService } from './../../providers/auth.service';
import { BaseComponent } from "../base.component";
import { HistoricoClinicoPage } from './../../pages/historico-clinico/historico-clinico';
import { User } from './../../models/user.model';
import { UserProfilePage } from './../../pages/user-profile/user-profile';
import { SinaisInfartoPage } from './../../pages/sinais-infarto/sinais-infarto';

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

  onProfile(): void {
    this.navCtrl.push(UserProfilePage);
  }

  onHistoricoClinico(): void {
    this.navCtrl.push(HistoricoClinicoPage);
  }

  onSinaisInfarto(): void {
    this.navCtrl.push(SinaisInfartoPage);
  }

}
