"use strict";
exports.__esModule = true;
var Server_1 = require("./Server/Server");
var Launcher = /** @class */ (function () {
    function Launcher() {
        this.servidor = new Server_1.Server();
    }
    Launcher.prototype.launchApp = function () {
        this.servidor.crearServer();
    };
    return Launcher;
}());
new Launcher().launchApp();
