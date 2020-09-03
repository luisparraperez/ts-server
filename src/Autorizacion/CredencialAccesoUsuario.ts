import { CredencialUsuario } from "../Shared/Modelo";
import * as Nedb from 'nedb'; 

export class CredencialAccesoUsuario {

    private nedb: Nedb;
    constructor() {
        this.nedb = new Nedb('database/AccesoUsuario.db');
        this.nedb.loadDatabase();
    }

    public async ingresaCredencialUsuario(CredencialUsuario: CredencialUsuario | undefined): Promise<any> {
        return new Promise((resolve, reject) => {
            this.nedb.insert(CredencialUsuario , (err: Error | null , docs: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs)
                }
            })
        });
    }

    public async obtenerCredencialUsuario(usuario: string, clave: string): Promise<CredencialUsuario | undefined> {
            return new Promise((resolve,reject) =>{
                this.nedb.find({usuario:usuario,clave:clave},(error:Error,docs:CredencialUsuario[])=>{
                    if (error){
                        reject(error);
                    }
                    else{
                        if(docs.length == 0 ){
                            resolve(undefined);
                        }
                        else{
                            resolve(docs[0])
                        }
                    }
                        
                    
                });
            });
    }

} 