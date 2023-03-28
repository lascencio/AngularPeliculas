import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css']
})
export class IndiceCinesComponent {

  constructor(private cinesService: CinesService) { }

  cines: cineDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  cantidadRegistrosaMostrar = 10;
  paginaActual = 1;


  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosaMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.cinesService.obtenerTodos(pagina, cantidadElementosAMostrar)
    .subscribe({
      next: (respuesta: HttpResponse<cineDTO[]>) => {
        this.cines = respuesta.body, 
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
    this.cinesService.borrar(id)
    .subscribe({
      next: () => this.cargarRegistros(this.paginaActual, this.cantidadRegistrosaMostrar),
      error: (error) => console.error(error)
    })
  }

}
