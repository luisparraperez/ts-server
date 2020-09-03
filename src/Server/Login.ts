import { IncomingMessage, ServerResponse } from "http";
import { Usuario, Handler, GeneradorDeToker } from "./Modelo";
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Modelo";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { contarInstacias } from "../Shared/ObjectsCounter";
@contarInstacias
export class Login extends BaseRequestHandler{
    private generadorToken: GeneradorDeToker;

    public constructor(generadorToken:GeneradorDeToker,request?:IncomingMessage,response?:ServerResponse){
        super({} as any ,{} as any);
        this.generadorToken=generadorToken

    }

    public async  handleRequest():Promise<void>{

        switch (this.request.method) {
            case HTTP_METHODS.POST:
                await this.peticionPost();
                break;
                case HTTP_METHODS.OPTIONS:
                    this.response.writeHead(HTTP_CODES.OK);
                    break;
        
            default:
                await this.peticionNotFound();
                break;
        }
        
        
    }
  

    private async peticionPost(){
        try {
            const body: Usuario= await this.getrequestBody();
            const tokenSesion = await this.generadorToken.generarToken(body);
        if(tokenSesion){
            this.response.statusCode= HTTP_CODES.CREATED;
            this.response.writeHead(HTTP_CODES.CREATED,{'Content-Type':'application/json'})
            this.response.write(JSON.stringify(tokenSesion))
            //this.response.write('Pudiste entrar con el token '+tokenSesion.MiTocken)
        }
        else{
            this.response.statusCode= HTTP_CODES.NOT_FOUND;
            this.response.write('problema con el usuario o constraseña.')
        }
        } catch (error) {
            this.response.write('el error es:'+error.message);
        }
    }

    

}