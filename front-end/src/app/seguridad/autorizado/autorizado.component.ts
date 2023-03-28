import { Component, Input } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.css']
})
export class AutorizadoComponent {
  
  constructor(private seguridadService: SeguridadService) {
  }

  @Input()
  rol: string;

  estaAutorizado(): Boolean{
    if(this.rol){
      return this.seguridadService.obtenerRol() == this.rol;
    }
    else{
      return this.seguridadService.estaLogueado();
    }
  }
}
