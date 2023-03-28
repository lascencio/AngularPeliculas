import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { credencialesUsuario } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor(private seguridadService: SeguridadService,
  private router: Router) {}

  errores: string[] = [];

  login(credneciales: credencialesUsuario){
    this.seguridadService.login(credneciales)
    .subscribe({
      next: (respuesta) => {
        this.seguridadService.guardarToken(respuesta),
        this.router.navigate(['/'])
      },
      error: (errores) => this.errores = parsearErroresAPI(errores)
    })
  }
}
