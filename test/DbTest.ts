import { CredencialAccesoUsuario } from "../src/Autorizacion/CredencialAccesoUsuario";
import { AccesoUsuarioDB } from "../src/Usuario/AccesoUsuarioDB";

class Dbtest{

    public  dbAccess: CredencialAccesoUsuario= new CredencialAccesoUsuario();
    public AccesoUsuarioDB: AccesoUsuarioDB = new AccesoUsuarioDB();
}

/*new Dbtest().dbAccess.ingresaCredencialUsuario({
    usuario:'luisito',
    clave:'1234',
    Accesos:[1,2,3,4]
});*/

new Dbtest().AccesoUsuarioDB.creaUsuario({
    edad:30,
    email:'prueba@email.cl',
    id:'1234',
    cargo: 1,
    nombre:'Luis Parra'

});