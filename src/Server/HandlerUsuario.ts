import { Handler, ValidadorToken, Usuario } from "./Modelo";
import { ServerResponse,IncomingMessage } from "http";
import { AccesoUsuarioDB } from "../Usuario/AccesoUsuarioDB";
import { HTTP_METHODS,HTTP_CODES, Accesos, Usuarios } from "../Shared/Modelo";
import { Utilidades } from "./Utilidades";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { parse } from "path";
import { contarInstacias } from "../Shared/ObjectsCounter";
@contarInstacias

export class HandlerUsuario extends BaseRequestHandler
{
    private accesousuarioDB: AccesoUsuarioDB = new AccesoUsuarioDB();
    private validadorToken: ValidadorToken;

    public constructor(validadorToken: ValidadorToken,request?:IncomingMessage,response?:ServerResponse){
      
        super({} as any,{} as any)
        this.validadorToken=validadorToken;
    }
    async handleRequest(): Promise<void> {
switch (this.request.method) {
    case HTTP_METHODS.OPTIONS:
                    this.response.writeHead(HTTP_CODES.OK);
                    break;
    case HTTP_METHODS.GET:
        await this.obtenerHandle();
        break;

    case HTTP_METHODS.POST:
        await this.actualizaUsuario();
        break;    
        
        
    case HTTP_METHODS.PUT:
        await this.ponerHandle();
        break;   
    case HTTP_METHODS.DELETE:
        await   this.borrarHandle(); 
        break;

    default:
        this.peticionNotFound();
        break;
}    }

private  async operacionAutorizada(operacion: Accesos): Promise<boolean>{
    const token = this.request.headers.authorization;
    if(token){
        const accesosToken = await this.validadorToken.validaToken(token);
        if(accesosToken.accesos.includes(operacion)){
            return true

        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}
private async actualizaUsuario(){
    const operacion = await this.operacionAutorizada(Accesos.ACTUALIZAR);
    if (operacion){
        const parseUrl = Utilidades.obtenerparametrosUrl(this.request.url );
        if(parseUrl){
            const idUsuario=parseUrl.query.id;
            if(idUsuario){
                try {
                    const usuario:Usuarios= await this.getrequestBody();
                    if(usuario){
                        usuario.id=idUsuario as string;
                        const actualizacion = await this.accesousuarioDB.actualizacionUsuario(idUsuario as string,usuario);
                        if (actualizacion){
                            this.respuestaString(HTTP_CODES.OK,'USUARIO ACTUALIZADO');

                        }
                        else{
                            this.respuestaString(HTTP_CODES.NOT_FOUND,'USUARIO no encontrado');
  
                        }
                    }
                    else{
                        this.respuestaError('No ha enviado los datos para la actualización');

                    }
                } catch (error) {
                    this.respuestaError(error.message);   
                }
                
            }
            else{
                this.respuestaError('No se ha enviado el parámetro del id del usuario.');

            }

        }
        else{
            this.respuestaError('Url no válida.');
        }
    }
    else{
        this.respuestaSinAutorizacion('Problema de autentificación');  
    }
}
private async borrarHandle(){
    const operacion = await this.operacionAutorizada(Accesos.BORRAR);
    if (operacion){
        const parseUrl = Utilidades.obtenerparametrosUrl(this.request.url );
        if (parseUrl){
            const idUsuario=parseUrl?.query.id;
            if(idUsuario){
                const borrado = await this.accesousuarioDB.borrarUsuario(idUsuario as string );
                if (borrado)
                    this.respuestaString(HTTP_CODES.OK,'USUARIO ELIMINADO');
                else 
                    this.respuestaString(HTTP_CODES.NOT_FOUND,'USUARIO no encontrado');

            }
            
            else{
                this.respuestaError('No se ha enviado el parámetro del id del usuario.');

            }
        }
        else{
            this.respuestaError('Url no válida.');
        }
    }
    else{
        this.respuestaSinAutorizacion('Problema de autentificación'); 

    }
}

private async ponerHandle(){
    const operacion = await this.operacionAutorizada(Accesos.LEER);
    if (operacion){
        try {
            const usuario:Usuarios= await this.getrequestBody();
            await this.accesousuarioDB.creaUsuario(usuario);
            this.respuestaString(HTTP_CODES.CREATED,`Usuario ${usuario.nombre} creado.`);
    
        } catch (error) {
            this.respuestaError(error.message);      
        }    
    }
    else{
           this.respuestaSinAutorizacion('Problema de autentificación'); 
    }

}

private async obtenerHandle(){
    const operacion = await this.operacionAutorizada(Accesos.LEER);
    if (operacion){
        const parseUrl = Utilidades.obtenerparametrosUrl(this.request.url );
    if (parseUrl){
        const idUsuario=parseUrl?.query.id;
        if(idUsuario){
            const usuario = await this.accesousuarioDB.obtenerUsuarioporId(idUsuario as string );
            if(usuario){
                this.respuestaJson(HTTP_CODES.OK,usuario);
            }
            else{
                this.peticionNotFound();
            }
        }
        else if (parseUrl.query.email){
            console.log('llega aqui');
           const usuarios=  await this.accesousuarioDB.obtenerUsuario(parseUrl.query.email as string);    
           console.log('termina consulta')
           this.respuestaJson(HTTP_CODES.OK,usuarios);

        }
        
        else{
            this.respuestaError('No se ha enviado el parámetro del id del usuario.');
            
        }
    }
    else{
        this.respuestaError('Url no válida.');
    }
    }
    else{
           this.respuestaSinAutorizacion('Problema de autentificación'); 
    }
    

}
}