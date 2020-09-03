

export class Monitor{
    public static printInstancia(): string{
        let respuesta = '';
        Contador.objetoContador.forEach((value:number, key:string)=>{
            respuesta+=key+': '+value+'\n';
        });

        return respuesta;

    }
}

class Contador {
    static objetoContador: Map<string,number> = new Map();
    static suma(className:string){
            if(!this.objetoContador.get(className)){
                   this.objetoContador.set(className,1);
            }
            else{
               const valorActual = this.objetoContador.get(className);
               this.objetoContador.set(className,valorActual!+1);

            }
    }
}

export function contarInstacias<T extends {new (... args:any[]):{}}>(constructor:T){
    return class extends constructor{
    abc = Contador.suma(constructor.name);
}}