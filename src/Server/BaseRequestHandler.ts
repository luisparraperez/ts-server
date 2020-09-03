import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES } from "../Shared/Modelo";
import { Usuario } from "./Modelo";

export abstract class BaseRequestHandler{

    protected request: IncomingMessage;
    protected response: ServerResponse;

    public constructor(request:IncomingMessage,response:ServerResponse){
        this.request=request;
        this.response=response;

    }

    public setRequest(request: IncomingMessage){
        this.request=request;
    }
    
    public setResponse(response: ServerResponse){
        this.response=response;
    }
    abstract async handleRequest():Promise<void>
    protected async peticionNotFound(){
        this.response.statusCode=HTTP_CODES.NOT_FOUND;
        this.response.write('No se encuentra objeto solicitado.');
    }

    protected async  getrequestBody():Promise<any>{
        return new Promise((resolve,reject)=>{
            let body = ''; 
            this.request.on('data',(data:string)=>{
                body+=data;
            });
            this.request.on('end',()=>{
                try {
                   resolve(JSON.parse(body)) ;
                } catch (error) {
                    reject(error);
                }
            });

            this.request.on('error',(error:any)=>{
                reject(error);
            });

        });
    }

    protected respuestaError(mensaje:string){
           this.response.statusCode=HTTP_CODES.BAD_REQUEST;
           this.response.write(mensaje); 
    }

    protected respuestaJson(code:HTTP_CODES,objeto: any){
        this.response.writeHead(code,{'Content-Type':'application/json'});
        this.response.write(JSON.stringify(objeto));
    }
    protected respuestaSinAutorizacion(mensaje:string){
        this.response.statusCode=HTTP_CODES.UNAUTHORIZED;
        this.response.write(mensaje); 
 }
 protected respuestaString(code:HTTP_CODES,mensaje:string){
    this.response.statusCode=code;
    this.response.write(mensaje); 
}
    

}