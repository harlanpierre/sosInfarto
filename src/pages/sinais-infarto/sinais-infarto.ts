import { MapPage } from './../map/map';
import { PrincipalPage } from './../principal/principal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

import { AuthService } from './../../providers/auth.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';

import { ContatosPage } from '../contatos/contatos';

@Component({
  selector: 'page-sinais-infarto',
  templateUrl: 'sinais-infarto.html',
})
export class SinaisInfartoPage {

  sinaisInfartoForm: FormGroup;
  currentUser: User = new User();
  resultado: number = 0;
  historia: string;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public callNumber: CallNumber
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;

  }

  ionViewDidLoad() {
    this.userService.currentUser
      .valueChanges()
      .subscribe((user: User) => {
        this.currentUser = user;

        if(this.currentUser.escoreHistoria <= 4) {
          this.historia = 'baixo';

        } else if(this.currentUser.escoreHistoria > 4 && this.currentUser.escoreHistoria <= 8) {
          this.historia = 'intermediario';

        } else if(this.currentUser.escoreHistoria >= 9) {
          this.historia = 'alto';

        }
      });
  }



  onHomePage(): void {
    let loading: Loading = this.showLoading();
    this.navCtrl.setRoot(PrincipalPage);
    loading.dismiss();
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    this.editUser();
  }

  unchecked() {
    if(!this.currentUser.sn_dor_peito) {
      this.currentUser.sn_queima = false;
      this.currentUser.sn_aperto = false;
      this.currentUser.sn_irradia = false;
      this.currentUser.sn_irradia = false;
      this.currentUser.sn_superiores = false;
      this.currentUser.sn_pescoco = false;
    }
  }

  uncheckedIrradia() {
    if(!this.currentUser.sn_irradia) {
      this.currentUser.sn_superiores = false;
      this.currentUser.sn_pescoco = false;
    }
  }

  private editUser(): void {
    this.currentUser.escoreSinais = 0;

    if(this.currentUser.sn_dor_peito) {
      this.currentUser.escoreSinais = 0;
      this.currentUser.escoreSinais += 4;

    }

    if(this.currentUser.sn_superiores || this.currentUser.sn_pescoco) {
      if(this.currentUser.sn_dor_peito && this.currentUser.qtdTempo == 'mais') {
        this.currentUser.escoreSinais = 0;
        this.currentUser.escoreSinais += 5;

      }
    }

    if(this.currentUser.sn_dor_peito &&
      (this.currentUser.sn_sudorese || this.currentUser.sn_nausea ||
      this.currentUser.sn_vomito || this.currentUser.sn_dispneia)) {

        this.currentUser.escoreSinais = 0;
        this.currentUser.escoreSinais += 5;
    }

    if(this.currentUser.sn_dor_peito && this.historia == 'baixo'
      && !this.currentUser.sn_queima && !this.currentUser.sn_aperto
      && !this.currentUser.sn_irradia && !this.currentUser.sn_superiores
      && !this.currentUser.sn_pescoco && !this.currentUser.sn_sudorese
      && !this.currentUser.sn_nausea && !this.currentUser.sn_vomito
      && !this.currentUser.sn_dispneia) {

        this.currentUser.escoreSinais = 0;
        this.currentUser.escoreSinais += 5;
    } else if(this.currentUser.sn_dor_peito && this.historia == 'intermediario'
      && !this.currentUser.sn_queima && !this.currentUser.sn_aperto
      && !this.currentUser.sn_irradia && !this.currentUser.sn_superiores
      && !this.currentUser.sn_pescoco && !this.currentUser.sn_sudorese
      && !this.currentUser.sn_nausea && !this.currentUser.sn_vomito
      && !this.currentUser.sn_dispneia) {

        this.currentUser.escoreSinais = 0;
        this.currentUser.escoreSinais += 6;
    } else if(this.currentUser.sn_dor_peito && this.historia == 'alto'
      && !this.currentUser.sn_queima && !this.currentUser.sn_aperto
      && !this.currentUser.sn_irradia && !this.currentUser.sn_superiores
      && !this.currentUser.sn_pescoco && !this.currentUser.sn_sudorese
      && !this.currentUser.sn_nausea && !this.currentUser.sn_vomito
      && !this.currentUser.sn_dispneia) {

        this.currentUser.escoreSinais = 0;
        this.currentUser.escoreSinais += 7;
    }

    if(this.currentUser.sn_sudorese || this.currentUser.sn_nausea ||
      this.currentUser.sn_vomito || this.currentUser.sn_dispneia) {

        this.currentUser.escoreSinais += 1;
    }

    if(this.currentUser.escoreSinais <= 4){
      this.sinaisBaixo();
    } else if(this.currentUser.escoreSinais == 5) {
      this.sinaisIntermediario();
    } else if(this.currentUser.escoreSinais >= 6) {
      this.sinaisAlto();
    }
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();

    return loading;
  }

 // private showAlert(message: string): void {
   // this.alertCtrl.create({
     // message: message,
      //buttons: ['Ok']
    //}).present();
 // }

  sinaisBaixo(): void {
    this.alertCtrl.create({
        title: 'Risco Baixo',
        message: 'Você está com risco baixo, deseja agendar consulta com seu médico assistente?',
        buttons: [
            {
                text: 'Sim',
                handler: () => {
                  let loading: Loading = this.showLoading();
                  this.userService
                  .editHistorico(this.currentUser).then(() => {
                    this.navCtrl.push(ContatosPage);
                    loading.dismiss();
                  });

                }
            },
            {
              text: 'Não',
              handler: () => {
                let loading: Loading = this.showLoading();
                this.userService
                .editHistorico(this.currentUser).then(() => {
                  this.navCtrl.setRoot(PrincipalPage);
                  loading.dismiss();
                });
              }
            }
        ]
    }).present();
  }

  sinaisIntermediario(): void {
    this.alertCtrl.create({
        title: 'Risco Intermediario',
        message: 'Você está com risco intermediario, deseja pesquisar uma unidade de saúde?',
        buttons: [
            {
              text: 'Sim',
              handler: () => {
                let loading: Loading = this.showLoading();
                this.userService
                .editHistorico(this.currentUser).then(() => {
                  this.navCtrl.push(MapPage);
                  loading.dismiss();
                });
              }
            },
            {
              text: 'Não',
              handler: () => {
                let loading: Loading = this.showLoading();
                this.userService
                .editHistorico(this.currentUser).then(() => {
                  this.navCtrl.setRoot(PrincipalPage);
                  loading.dismiss();
                });
              }
            }
        ]
    }).present();
  }

  sinaisAlto(): void {
    this.alertCtrl.create({
        title: 'Risco Alto',
        message: 'Você está com risco alto, deseja acionar o SAMU?',
        buttons: [
            {
                text: 'Sim',
                handler: () => {
                  this.onAcionarEmergencia();

                }
            },
            {
              text: 'Não',
              handler: () => {
                let loading: Loading = this.showLoading();
                this.userService
                .editHistorico(this.currentUser).then(() => {
                  this.navCtrl.setRoot(PrincipalPage);
                  loading.dismiss();
                });
              }
            }
        ]
    }).present();
  }

  onAcionarEmergencia(): void {
    this.callNumber.callNumber("192", true)
      .then(res => console.log('Efetuando chamada.', res))
      .catch(err => console.log('Erro ao efetuar chamada.', err));
  }

}
