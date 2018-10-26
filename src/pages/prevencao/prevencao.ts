import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserService } from './../../providers/user.service';
import { User } from './../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-prevencao',
  templateUrl: 'prevencao.html',
})
export class PrevencaoPage {

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

  onSaibaMais() {
    this.navCtrl.pop();
  }

}
