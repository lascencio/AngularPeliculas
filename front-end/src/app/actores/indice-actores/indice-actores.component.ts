import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent {

  constructor(private actoresService: ActoresService) {}

  actores: actorDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  cantidadRegistrosaMostrar = 10;
  paginaActual = 1;


  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosaMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.actoresService.obtenerTodos(pagina, cantidadElementosAMostrar)
    .subscribe({
      next: (respuesta: HttpResponse<actorDTO[]>) => {
        this.actores = respuesta.body, 
        this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros")
        },
      error: (error) => console.log(error)
    });
  }

  actualizarPaginacion(datos: PageEvent){ 
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosaMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosaMostrar);
  }

  borrar(id: number){
    this.actoresService.borrar(id)
    .subscribe({
      next: () => this.cargarRegistros(this.paginaActual, this.cantidadRegistrosaMostrar),
      error: (error) => console.error(error)
    })
  }
}
