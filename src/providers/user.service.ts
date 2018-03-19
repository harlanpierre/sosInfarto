import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';

import { FirebaseApp } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";

import { BaseService } from "./base.service";
import { User } from './../models/user.model';

import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class UserService extends BaseService {

  users: Observable<User[]>;
  user: User = new User();
  currentUser: AngularFireObject<User>;
  storageRef = firebase.storage().ref();

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public firebaseApp: FirebaseApp,
    public http: Http
  ) {
    super();
    this.listenAuthState();
  }

  private setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<User>(
      this.db.list<User>(`/users`,
        (ref: firebase.database.Reference) => ref.orderByChild('name')
      )
    )
      .map((users: User[]) => {
        return users.filter((user: User) => user.$key !== uidToExclude);
      });
  }

  private listenAuthState(): void {
    this.afAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          console.log('Auth state alterado!');
          this.currentUser = this.db.object(`/users/${authUser.uid}`);
          this.setUsers(authUser.uid);
        }
      });
  }

  create(user: User, uuid: string): Promise<void> {
    this.user = user;
    /*user.sn_fuma = false;
    user.sn_bebi = false;
    user.sn_infartou = false;
    user.sn_avc = false;
    user.sn_pressao_alta = false;
    user.sn_diabetes = false;
    user.sn_sedentario = false;
    user.sn_cardiaco = false;
    user.sn_cirurgia_cardiaca = false;
    user.sn_familia_infartou = false;
    user.sn_familia_avc = false;
    user.sn_familia_pressao_alta = false;
    user.sn_familia_diabetes = false;
    user.sn_familia_cardiaco = false;*/
    return this.db.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  edit(user: { name: string, username: string, photo: string }): Promise<void> {
    return this.currentUser
      .update(user)
      .catch(this.handlePromiseError);
  }

  editHistorico(user: {
    sexo: string, peso: string, altura: string, idade: string,
    sn_fuma: boolean, sn_bebi: boolean, sn_infartou: boolean,
    sn_avc: boolean, sn_pressao_alta: boolean, sn_diabetes: boolean,
    sn_sedentario: boolean, sn_cardiaco: boolean, sn_cirurgia_cardiaca: boolean,
    sn_familia_infartou: boolean, sn_familia_avc: boolean, sn_familia_pressao_alta: boolean,
    sn_familia_diabetes: boolean, sn_familia_cardiaco: boolean
  }): Promise<void> {

    console.log('Estou no userService');
    console.log(this.currentUser);
    return this.currentUser
      .update(user)
      .catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.db.list(`/users`,
      (ref: firebase.database.Reference) => ref.orderByChild('name').equalTo(username)
    )
      .valueChanges()
      .map((users: User[]) => {
        return users.length > 0;
      }).catch(this.handleObservableError);
  }

  get(userId: string): AngularFireObject<User> {
    return this.db.object<User>(`/users/${userId}`);
  }

  uploadPhoto(file: File, userId: string): firebase.storage.UploadTask {
    return firebase.storage().ref().child(`/users/${userId}`).put(file);
  }

}
