import * as Nedb from 'nedb'; 
import { Usuarios } from './src/Shared/Modelo';

export class AccesoUsuarioDB{
    private nedb: Nedb;

    constructor(){
        this.nedb= new Nedb('database/Usuario.db')
    }

    public async creaUsuario(usuario: Usuarios) {
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
}