import { PrincipalPage } from './../principal/principal';
import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Loading, LoadingController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { AuthService } from './../../providers/auth.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';
import { Contato } from '../../models/contato.model';


@IonicPage()
@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html',
})
export class ContatosPage {

  currentUser: User = new User();
  contatos: Array<Contato> = [];
  canEdit: boolean = false;
  contatosForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public viewCtl: ViewController,
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public userService: UserService) {

      this.contatosForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        telefone: ['', [Validators.required, Validators.minLength(8)]]
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
      
      this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .first()
      .subscribe((currentUser: User) => {
        this.db.list(`/users/${currentUser.$key}/contatos`).valueChanges().subscribe((items: Contato[]) => {
          this.contatos = items;
          console.log(this.contatos +''+items);
        });
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();

  }

  private editContato(contato) {
    let loading: Loading = this.showLoading();
    this.userService
      .editContato(this.contatos)
      .then(() => {
          this.navCtrl.setRoot(PrincipalPage);
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

  findContatoIndex(id) {
    for (let i=0; i < this.contatos.length; i++) {
      if(this.contatos[i].id == id) {
        return i;
      }
    }
    return null;
  }

  changeContato(contato) {
    let index = this.findContatoIndex(contato.id);
    this.contatos[index] = contato;
  }

  remove(contato) {
    let index = this.findContatoIndex(contato.id);
    this.contatos.splice(index, 1);
    
    let loading: Loading = this.showLoading();
    this.userService
      .editContato(this.contatos)
      .then(() => {
          this.navCtrl.setRoot(PrincipalPage);
          loading.dismiss();
        });
  }

  addContato() {
    let id = this.contatos.length+1;
    this.contatos.push({"id": ''+id,
          "nome": "",
         "telefone": ""});
         debugger
  }

}
