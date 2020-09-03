import { Accesos } from "../Shared/Modelo";

export interface Usuario{
    usuario: string;
    clave: string;
}

export interface Handler{
    loginRequest():void
}

export interface TokenDeSesion{
    MiTocken : string,
    usuario: string,
    valid: boolean,
    tiempoExpira: Date,
    accesos:Accesos[]


}
export enum EstadoToken{
    VALID,INVALID,EXPIRED
}

export interface GeneradorDeToker{
    generarToken(usuario:Usuario):Promise<TokenDeSesion | undefined>
}

export interface ValidadorToken{
    validaToken(token:string):Promise<permisoToken>
}

export interface permisoToken{
    accesos:Accesos[],
    estado:EstadoToken
}