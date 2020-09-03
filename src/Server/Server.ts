import {createServer, IncomingMessage, ServerResponse} from 'http';
import { Utilidades } from './Utilidades';
import { Login } from './Login';
import { Autorizacion } from '../Autorizacion/Autorizacion';
import { HandlerUsuario } from './HandlerUsuario';
import { Monitor } from '../Shared/ObjectsCounter';

export class Server {

    private autorizacion:Autorizacion= new Autorizacion();
    private login:Login = new Login(this.autorizacion);
    private handlerUsuario: HandlerUsuario= new HandlerUsuario(this.autorizacion);

    public crearServer(){
       createServer(
           async (request:IncomingMessage,response:ServerResponse)=>{
             console.log('peticion de '+request.url);
             this.agregarHeaders(response);
             const basePath = Utilidades.getBasePath(request.url)
             switch (basePath) {
                 case 'infoSistema':
                     response.write(Monitor.printInstancia());
                     break;
                 case 'login':
                     this.login.setRequest(request);
                     this.login.setResponse(response);
                     await this.login.handleRequest();
                     
                     break;
                    case 'usuario':
                        this.handlerUsuario.setRequest(request);
                        this.handlerUsuario.setResponse(response);
                     await this.handlerUsuario.handleRequest();
                        break;
                 default:
                     break;
             }
             response.end();
       }
       ).listen(8080)
       console.log('Servidor arriba')
    }

    private agregarHeaders(response:ServerResponse)
    {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', '*');
        response.setHeader('Access-Control-Allow-Methods', '*');

    }

}