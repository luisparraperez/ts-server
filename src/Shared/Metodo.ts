

export function imprimeLog(objetivo:Object,propiedad:string,descriptor: PropertyDescriptor){
    const nombreClase = objetivo.constructor.name;
    let originalMethod = descriptor.value;
    descriptor.value = async function(...args:any[]){
        console.log(`${nombreClase}#${propiedad} llamada con : ${JSON.stringify(args)}`)

        const resultado = await originalMethod.apply(this,args);
        console.log(`${nombreClase}#${propiedad} retorna : ${JSON.stringify(resultado)}`)

        return resultado;
    }
    return descriptor;
}

export function delayResponse(tiempo:number){
    return function (objetivo:Object,propiedad:string,descriptor: PropertyDescriptor){
        let originalMethod = descriptor.value;
        descriptor.value = async function(...args:any[]){
    
            const resultado = await originalMethod.apply(this,args);
            await delay(tiempo);    
            return resultado;
        }
    }
}

async function delay(tiempo:number){
    return new Promise<void>((resolve)=> setTimeout(()=>{
        resolve();
    }
    ,tiempo));
}