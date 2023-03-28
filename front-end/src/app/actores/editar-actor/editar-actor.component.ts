import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO, actorDTO } from '../actor'
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  constructor(
    private router: Router,
    private actoresService: ActoresService,
    private activeRoute: ActivatedRoute
  ) {}

  modelo: actorDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: (params) => this.actoresService.obtenerPorId(params.id)
        .subscribe(genero => this.modelo = genero),
      error: (e) => this.router.navigate(['/generos'])
    });
  }

  guardarCambios(actor: actorCreacionDTO) {
    this.actoresService.editar(this.modelo.id, actor)
    .subscribe({
      next: ()=> this.router.navigate(['/actores']),
      error: (e)=> this.errores = parsearErroresAPI(e)
    });
    
  }

}
