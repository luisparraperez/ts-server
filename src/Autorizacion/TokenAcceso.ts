import Nedb = require("nedb");
import { TokenDeSesion } from "../Server/Modelo";
import { rejects } from "assert";


export class TokenAcceso{
    private nedb: Nedb;

    constructor(){
        this.nedb= new Nedb('database/TokenSesion.db');
        this.nedb.loadDatabase();
        
    }

    public async guardaTokenSesion(token: TokenDeSesion):Promise<void>{
        return new Promise((resolve,reject)=>{
            this.nedb.insert(token,(error:Error | null)=>{
                if(error){
                    reject(error);
                }
                else{
                    resolve();
                }

            });
        });
    }

    public async obtenerTokenSesion(token:string):Promise<TokenDeSesion| undefined>{
        return new Promise((resolve,reject)=>{
            this.nedb.find({MiTocken:token},(error: Error, docs: any[])=>{
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
            })
        });
    }

}