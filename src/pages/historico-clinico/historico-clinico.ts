import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { AuthService } from './../../providers/auth.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';

@Component({
  selector: 'page-historico-clinico',
  templateUrl: 'historico-clinico.html',
})
export class HistoricoClinicoPage {

  historicoClinicoForm: FormGroup;
  currentUser: User = new User();

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.historicoClinicoForm = this.formBuilder.group({
      peso: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
      altura: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
      idade: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      sexo: ['', [Validators.required]],
      sn_fuma: [false],
      sn_bebi: [false],
      sn_infartou: [false],
      sn_avc: [false],
      sn_pressao_alta: [false],
      sn_diabetes: [false],
      sn_sedentario: [false],
      sn_cardiaco: [false],
      sn_cirurgia_cardiaca: [false],
      sn_familia_infartou: [false],
      sn_familia_avc: [false],
      sn_familia_pressao_alta: [false],
      sn_familia_diabetes: [false],
      sn_familia_cardiaco: [false]
    });
    
    this.currentUser.sn_fuma = false;
    this.currentUser.sn_bebi = false;
    this.currentUser.sn_infartou = false;
    this.currentUser.sn_avc = false;
    this.currentUser.sn_pressao_alta = false;
    this.currentUser.sn_diabetes = false;
    this.currentUser.sn_sedentario = false;
    this.currentUser.sn_cardiaco = false;
    this.currentUser.sn_cirurgia_cardiaca = false;
    this.currentUser.sn_familia_infartou = false;
    this.currentUser.sn_familia_avc = false;
    this.currentUser.sn_familia_pressao_alta = false;
    this.currentUser.sn_familia_diabetes = false;
    this.currentUser.sn_familia_cardiaco = false;

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
    
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .valueChanges()
      .subscribe((user: User) => {
        this.currentUser = user;
      });

      console.log(this.currentUser);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    this.editUser();
  }

  private editUser(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.historicoClinicoForm.value;
    this.userService
      .editHistorico({
        sexo: formUser.sexo, peso: formUser.peso, altura: formUser.altura, idade: formUser.idade,
        sn_fuma: formUser.sn_fuma, sn_bebi: formUser.sn_bebi, sn_infartou: formUser.sn_infartou,
        sn_avc: formUser.sn_avc, sn_pressao_alta: formUser.sn_pressao_alta, sn_diabetes: formUser.sn_diabetes,
        sn_sedentario: formUser.sn_sedentario, sn_cardiaco: formUser.sn_cardiaco, sn_cirurgia_cardiaca: formUser.sn_cirurgia_cardiaca,
        sn_familia_infartou: formUser.sn_familia_infartou, sn_familia_avc: formUser.sn_familia_avc, sn_familia_pressao_alta: formUser.sn_familia_pressao_alta,
        sn_familia_diabetes: formUser.sn_familia_diabetes, sn_familia_cardiaco: formUser.sn_familia_cardiaco
      }).then(() => {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
