export interface Coordenada{
    latitud: number;
    longitud: number;
}

export interface CoordenadaConMensaje extends Coordenada{
    mensaje: string; //-> para mostrar en el mapa el nombre del cine
}