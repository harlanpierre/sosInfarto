import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from './../../providers/auth.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';

import { HomePage } from './../home/home';

@Component({
  selector: 'page-sinais-infarto',
  templateUrl: 'sinais-infarto.html',
})
export class SinaisInfartoPage {

  sinaisInfartoForm: FormGroup;
  currentUser: User = new User();
  resultado: number = 0;
  //Bloco 1
  sn_peito_facada: boolean = false;
  sn_peito_aperto: boolean = false;
  sn_peito_constante: boolean = false;
  sn_peito_vai_volta: boolean = false;
  //Bloco 2
  sn_irradia_estomago: boolean = false;
  sn_irradia_queixo: boolean = false;
  sn_irradia_costas: boolean = false;
  sn_irradia_braco: boolean = false;
  //Bloco 3
  sn_outros_respirar: boolean = false;
  sn_outros_formigamento: boolean = false;
  sn_outros_tontura: boolean = false;
  sn_outros_enjoo: boolean = false;
  sn_outros_cansaco: boolean = false;
  sn_outros_suor: boolean = false;
  //Bloco 4
  sn_ultimas_discutiu: boolean = false;
  sn_ultimas_evento_estressante: boolean = false;
  sn_ultimas_dormiu: boolean = false;
  sn_ultimas_alimentou: boolean = false;
  sn_ultimas_bebida: boolean = false;
  sn_ultimas_droga: boolean = false;
  sn_ultimas_medicamento: boolean = false;
  sn_ultimas_fisico: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.sinaisInfartoForm = this.formBuilder.group({
      sn_peito_facada: [false],
      sn_peito_aperto: [false],
      sn_peito_constante: [false],
      sn_peito_vai_volta: [false],
      sn_peito_nenhuma: [false],

      sn_irradia_estomago: [false],
      sn_irradia_queixo: [false],
      sn_irradia_costas: [false],
      sn_irradia_braco: [false],
      sn_irradia_nenhuma: [false],

      sn_outros_respirar: [false],
      sn_outros_formigamento: [false],
      sn_outros_tontura: [false],
      sn_outros_enjoo: [false],
      sn_outros_cansaco: [false],
      sn_outros_suor: [false],
      sn_outros_nenhuma: [false],

      sn_ultimas_discutiu: [false],
      sn_ultimas_evento_estressante: [false],
      sn_ultimas_dormiu: [false],
      sn_ultimas_alimentou: [false],
      sn_ultimas_bebida: [false],
      sn_ultimas_droga: [false],
      sn_ultimas_medicamento: [false],
      sn_ultimas_fisico: [false],
      sn_ultimas_nenhuma: [false]
    });

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
  }

  onDisabled(): void {
    let form = this.sinaisInfartoForm.value;
    //Bloco 1
    if (form.sn_peito_nenhuma) {
      this.sn_peito_facada = false;
      this.sn_peito_aperto = false;
      this.sn_peito_constante = false;
      this.sn_peito_vai_volta = false;
    }
    //Bloco 2
    if(form.sn_irradia_nenhuma) {
      this.sn_irradia_estomago = false;
      this.sn_irradia_queixo = false;
      this.sn_irradia_costas = false;
      this.sn_irradia_braco = false;
    }
    //Bloco 3
    if(form.sn_outros_nenhuma) {
      this.sn_outros_respirar = false;
      this.sn_outros_formigamento = false;
      this.sn_outros_tontura = false;
      this.sn_outros_enjoo = false;
      this.sn_outros_cansaco = false;
      this.sn_outros_suor = false;
    }
    //Bloco 4
    if(form.sn_ultimas_nenhuma) {
      this.sn_ultimas_discutiu = false;
      this.sn_ultimas_evento_estressante = false;
      this.sn_ultimas_dormiu = false;
      this.sn_ultimas_alimentou = false;
      this.sn_ultimas_bebida = false;
      this.sn_ultimas_droga = false;
      this.sn_ultimas_medicamento = false;
      this.sn_ultimas_fisico = false;
    }

  }

  onHomePage(): void {
    let loading: Loading = this.showLoading();
    this.navCtrl.setRoot(HomePage);
    loading.dismiss();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
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
