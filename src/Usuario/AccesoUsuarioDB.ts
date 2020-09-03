import * as Nedb from 'nedb'; 
import { Usuarios } from '../Shared/Modelo';

export class AccesoUsuarioDB{
    private nedb: Nedb;

    constructor(){
        this.nedb= new Nedb('database/Usuario.db');
        this.nedb.loadDatabase();
    }

    public async creaUsuario(usuario: Usuarios) {
        if(!usuario.id){
            usuario.id=this.generarIdUsuario();
        }
            return new Promise((resolve,reject)=>{
                this.nedb.insert(usuario,(error: Error | null)=>{
                        if(error){
                            reject(error);
                        }
                        else{
                            resolve();
                        }
                })
            });

    }

    public async obtenerUsuario(valor:string):Promise<Usuarios[]>{
        const regEx = new RegExp(valor);
        return new Promise((resolve,reject)=>{
            this.nedb.find({email:regEx},(error:Error,docs:any[])=>{
                if(error)
                    reject(error);
                else 
                    resolve(docs);    
            });
        });

    }
public async  borrarUsuario(id:string): Promise<boolean> {
    const resultado = await this.borrarUsuarioBD(id);
    this.nedb.loadDatabase();
    return resultado;
}

public async actualizacionUsuario(id:string,usuario:Usuarios):Promise<boolean>{
    const resultado = await this.actualizaUsuarioBD(id,usuario);
    this.nedb.loadDatabase();
    return resultado;
}

private async actualizaUsuarioBD(id:string,usuario:Usuarios):Promise<boolean>{
    return new Promise((resolve,reject)=>{
        this.nedb.update({id:id},{$set:usuario},{},(error:Error | null,numReplaced:number )=>{
            if(error){
                reject(error);
            }
            else{
                if(numReplaced==0)
                    resolve(false);
                else 
                    resolve(true);
            }
        });
    });
}

    private  async borrarUsuarioBD(id: string):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            this.nedb.remove({id:id},(error:Error | null ,numRemoved: number)=>{
                if (error){
                    reject(error);
                }
                else{
                        if(numRemoved==0)
                            resolve(false);
                        else 
                            resolve(true);    
                }
            })
        });

    }

    public async obtenerUsuarioporId(idusuario: string) :Promise<Usuarios | undefined>{
        return new Promise((resolve,reject)=>{
                this.nedb.find({id:idusuario},(error:Error,docs:any[])=>{
                    if(error){
                        reject(error);
                    }
                    else{
                       if(docs.length==0){
                           resolve(undefined);
                       }
                       else{
                           resolve(docs[0]);
                       }

                    }
                });
        });

    }

    private generarIdUsuario(){
        return Math.random().toString(36).slice(2);
    }
}