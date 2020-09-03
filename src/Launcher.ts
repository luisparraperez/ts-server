import {Server} from './Server/Server'
class Launcher{
	servidor: Server;

	constructor(){
		this.servidor= new Server();
	}

	launchApp(){
		this.servidor.crearServer()	
	}
}

new Launcher().launchApp();