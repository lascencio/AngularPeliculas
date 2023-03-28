export interface actorDTO { //Esta clase es para leer
    id: number;
    nombre: string;
    fechaNacimiento: Date;
    foto: string;
    biografia: string;
} 

export interface actorCreacionDTO { //Esta clase es para registrar un actor
    nombre: string;
    fechaNacimiento: Date;
    foto: File;
    biografia: string;
}

export interface actorPeliculaDTO{
    id: number;
    nombre: string;
    personaje: string;
    foto: string;
    orden: number;
}