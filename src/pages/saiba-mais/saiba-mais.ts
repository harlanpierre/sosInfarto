import { PrevencaoPage } from './../prevencao/prevencao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserService } from './../../providers/user.service';
import { User } from './../../models/user.model';

/**
 * Generated class for the SaibaMaisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saiba-mais',
  templateUrl: 'saiba-mais.html',
})
export class SaibaMaisPage {

  currentUser: User = new User();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .valueChanges()
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  onPrevencao() {
    this.navCtrl.push(PrevencaoPage);
  }

}
