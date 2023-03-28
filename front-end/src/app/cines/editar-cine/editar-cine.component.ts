import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css'],
})
export class EditarCineComponent implements OnInit {

  constructor(
    private router: Router,
    private cinesService: CinesService,
    private activeRoute: ActivatedRoute
  ) {}

  modelo: cineDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: (params) => this.cinesService.obtenerPorId(params.id)
        .subscribe(genero => this.modelo = genero),
      error: (e) => this.router.navigate(['/cines'])
    });
  }

  guardarCambios(cine: cineCreacionDTO) {
    this.cinesService.editar(this.modelo.id, cine)
    .subscribe({
      next: ()=> this.router.navigate(['/cines']),
      error: (e)=> this.errores = parsearErroresAPI(e)
    });
    
  }

}
