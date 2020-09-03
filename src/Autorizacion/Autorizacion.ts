import { GeneradorDeToker, Usuario,TokenDeSesion, ValidadorToken, permisoToken, EstadoToken } from "../Server/Modelo";
import { CredencialAccesoUsuario } from "./CredencialAccesoUsuario";
import { TokenAcceso } from "./TokenAcceso";
import { contarInstacias } from "../Shared/ObjectsCounter";
import { imprimeLog } from "../Shared/Metodo";
@contarInstacias
export class Autorizacion implements GeneradorDeToker,ValidadorToken{

    private CredencialAccesoUsuario: CredencialAccesoUsuario =new CredencialAccesoUsuario();
    private TokenAcceso: TokenAcceso= new TokenAcceso();
    @imprimeLog
    async generarToken(usuario: Usuario): Promise<import("../Server/Modelo").TokenDeSesion | undefined> {
        const resultadoCuenta= await this.CredencialAccesoUsuario.obtenerCredencialUsuario(usuario.usuario,usuario.clave);
        if (resultadoCuenta){
            const token:TokenDeSesion= {
                accesos:resultadoCuenta.Accesos,
                tiempoExpira: this.generarTiempoExpira(),
                usuario: resultadoCuenta.usuario,
                valid: true,
                MiTocken:this.generarTokenRandom()
            }

            await this.TokenAcceso.guardaTokenSesion(token);
            return token;
        }
        else 
            return undefined;
            
        
        
    }
    public async validaToken(token: string):Promise<permisoToken>{
            const elToken = await this.TokenAcceso.obtenerTokenSesion(token);
            if(!elToken || !elToken.valid){
                return {
                    estado:EstadoToken.INVALID,
                    accesos:[]
                }
            }
            else if(elToken.tiempoExpira< new Date()){
                return {
                    estado: EstadoToken.EXPIRED,
                    accesos: []
                }

            }
            else{
                return {
                    estado:EstadoToken.VALID,
                    accesos: elToken.accesos
                }
            }
    }

    private generarTiempoExpira(){
        return new Date(Date.now()+60*60*1000);

    }

    private generarTokenRandom(){
            return Math.random().toString(36).slice(2);
    }

}