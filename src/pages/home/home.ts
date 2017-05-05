import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    mapInitialised: boolean = false;
    apiKey: 'AIzaSyD1P8-4OLJqHwusZwlvFHn8GQ3LpPQF7-4';

    constructor(public navCtrl: NavController, public geolocation: Geolocation) {}

    ionViewDidLoad(){
        this.loadMap();
    }

    loadMap() {
        this.mapInitialised = true;

        this.geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            let mapOptions = {
                center: latLng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                styles: [
                    //{elementType: 'geometry', stylers: [{color: '#242f3e'}]}
                ]
            }

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            let marker = new google.maps.Marker({
                position: latLng
                /*map: this.map,*/
                /*icon: '../assets/images/marker.svg'*/
            });

            marker.setMap(this.map);

        }, (err) => {

            console.log(err);

        });
    }
}
