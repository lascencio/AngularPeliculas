import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { generoDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  constructor(private generosService: GenerosService) { }

  generos: generoDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  cantidadRegistrosaMostrar = 10;
  paginaActual = 1;


  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosaMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.generosService.obtenerPaginado(pagina, cantidadElementosAMostrar)
    .subscribe({
      next: (respuesta: HttpResponse<generoDTO[]>) => {
        this.generos = respuesta.body, 
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
    this.generosService.borrar(id)
    .subscribe({
      next: () => this.cargarRegistros(this.paginaActual, this.cantidadRegistrosaMostrar),
      error: (error) => console.error(error)
    })
  }
}
