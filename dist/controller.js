"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Analyzer_1 = require("./Analyzer");
var genetic_1 = require("./genetic");
var controller = /** @class */ (function () {
    function controller(pAudioS1, pAudioS2) {
        this.audioS1 = pAudioS1;
        this.audioS2 = pAudioS2;
        var analyceSong = new Analyzer_1.analyzer(pAudioS1.channelData[0], pAudioS2.channelData[0]);
        console.log(analyceSong.getAudioShape1().length + " controller S1");
        console.log(analyceSong.getAudioShape2().length + " controller S2");
        this.genet = new genetic_1.genetic(analyceSong.getAudioShape2());
        for (var index = 0; index < analyceSong.getAudioShape2().length; index++) {
            this.genet.makeFirstPopulaton(analyceSong.getAudioShape1()[index], index);
            this.genet.clear();
        }
    }
    //Para extraer datos de el analyce y recrear la cancion
    controller.prototype.generateNewSong = function () {
        this.genet.getNewPopulation(); // Como saber que elemento de la lista es(SUBIDA,BAJADA,...)
    };
    controller.prototype.getNewSong = function () {
    };
    return controller;
}());
exports.controller = controller;
//# sourceMappingURL=controller.js.map