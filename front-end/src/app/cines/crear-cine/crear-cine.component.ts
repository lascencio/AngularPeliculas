import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent {

  errores: string[] = [];

  constructor(private router: Router, private cinesService: CinesService){}
 
  guardarCambios(cine: cineCreacionDTO){
    this.cinesService.crear(cine).subscribe({
      next:() => this.router.navigate(['/cines']),
      error: (error) => this.errores = parsearErroresAPI(error)
    });
    
  }

}
