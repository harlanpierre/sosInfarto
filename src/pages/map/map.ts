import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { User } from './../../models/user.model';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  currentUser: User = new User();
  map: any;
  //static hospital: any;
  hospitais: any;

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public userService: UserService,
    private geolocation: Geolocation
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
      });

      this.initializeMap();
  }

  initializeMap() {
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log(position)
     const mapOptions = {
        disableDefaultUI: true,
        zoom: 16,
        center: position
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.directionsDisplay.setMap(this.map);

     /*const marker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: this.currentUser.name
      });

      google.maps.event.addListener(marker, "click", () => {
        let infowindow = new google.maps.InfoWindow();
        infowindow.setContent(marker.getTitle());
        infowindow.open(this.map, marker);
      });*/

    this.startPosition = position;
    let mapAux = this.map;
    let local = this.startPosition;

    //Pegando localização dos hospitais nos 5 quilometros mais proximos do usuario.
    let service = new google.maps.places.PlacesService(this.map);
    return new Promise((resolve,reject)=>{
    service.nearbySearch({
      location: this.startPosition,
      radius: 5000,
      type: ['hospital']
    }, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results)
        //MapPage.hospital = results;
        /*for(let i of results){
          //let placeLoc = i.geometry.location;
          let marker = new google.maps.Marker({
            position: i.geometry.location,
            map: mapAux,
            title: i.name
          });
          google.maps.event.addListener(marker, "click", () => {
            let infowindow = new google.maps.InfoWindow();
            //this.calculateRoute(i.vicinit);
            let destinationPosition = i.vicinity;
            if (destinationPosition) {
              const request = {
                // Pode ser uma coordenada (LatLng), uma string ou um lugar
                origin: local,
                destination: destinationPosition,
                travelMode: 'DRIVING'
              };
              let directionsDisplay = new google.maps.DirectionsRenderer();
              let directionsService = new google.maps.DirectionsService();
              directionsDisplay.setMap(mapAux);

              directionsService.route(request, function (result, status) {
                if (status == 'OK') {
                  directionsDisplay.setDirections(result);
                }
              });
            }
            infowindow.setContent(marker.getTitle());
            infowindow.open(mapAux, marker);
          });
        }*/
        resolve(results);
      } else {
        reject(status);
      }
    });
    }).then((results : Array<any>)=>{
      this.hospitais = results;
    });

    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });

  }

  calculateRoute(destino: string) {
    this.destinationPosition = destino;
    if (this.destinationPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.startPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

}
