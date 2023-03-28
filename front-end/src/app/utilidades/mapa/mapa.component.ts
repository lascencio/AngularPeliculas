import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map(valor => {
      let marcador = marker([valor.latitud, valor.longitud]);
      if(valor.mensaje){
        marcador.bindPopup(valor.mensaje, {autoClose: false, autoPan: false});
      }
      return marcador;
    });
  }

  @Input()
  coordenadasIniciales: CoordenadaConMensaje[] = [];

  @Input()
  soloLectura: boolean = false;

  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(-12.100612793923267, -76.9706976413727)
  };

  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent){
    if(!this.soloLectura){
      const latitud = event.latlng.lat;
      const longitud = event.latlng.lng;
      this.capas = [];
      this.capas.push(marker([latitud, longitud]));
      this.coordenadaSeleccionada.emit({
        latitud: latitud, longitud: longitud
      });
    }
    
    // this.capas.push(marker([latitud, longitud], {
    //   icon: icon({
    //     iconSize: [25,41],
    //     iconAnchor: [13,41],
    //     iconUrl: 'marker-icon.png',
    //     iconRetinaUrl: 'marker-icon-2x.png',
    //     shadowUrl: 'assets/marker-shadow.png'
    //   })
    // }));
    
  }
}
