import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO, generoDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css'],
})
export class EditarGeneroComponent implements OnInit {
  constructor(
    private router: Router,
    private generosService: GenerosService,
    private activeRoute: ActivatedRoute
  ) {}

  modelo: generoDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: (params) => this.generosService.obtenerPorId(params.id)
        .subscribe(genero => this.modelo = genero),
      error: (e) => this.router.navigate(['/generos'])
    });
  }

  guardarCambios(genero: generoCreacionDTO) {
    this.generosService.editar(this.modelo.id, genero)
    .subscribe({
      next: ()=> this.router.navigate(['/generos']),
      error: (e)=> this.errores = parsearErroresAPI(e)
    });
    
  }
}
