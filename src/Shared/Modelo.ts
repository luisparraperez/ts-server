import { Usuario } from '../Server/Modelo';

export  enum Accesos{
    CREAR,
    LEER,
    ACTUALIZAR,
    BORRAR
}

export interface CredencialUsuario extends Usuario{
    Accesos: Accesos[];

}

export enum HTTP_CODES{
    OK = 200,
    CREATED = 201,
    BAD_REQUEST= 400,
    NOT_FOUND= 404,
    UNAUTHORIZED=401
}

export enum HTTP_METHODS{
    GET ='GET',
    POST='POST',
    DELETE ='DELETE',
    PUT='PUT',
    OPTIONS='OPTIONS'
}

export interface Usuarios{
    id: string,
    nombre: string,
    edad: number,
    email:string,
    cargo: Cargo
}

export enum Cargo{
    CLIENTE
}