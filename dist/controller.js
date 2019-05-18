"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Analyzer_1 = require("./Analyzer");
var genetic_1 = require("./genetic");
var Constants_1 = require("./Constants");
var controller = /** @class */ (function () {
    function controller(pAudioS1, pAudioS2) {
        this.audioS1 = pAudioS1;
        this.audioS2 = pAudioS2;
        this.newAudioS1 = [[], []];
        this.analyceSong = new Analyzer_1.analyzer(pAudioS1.channelData[0], pAudioS2.channelData[0]);
        console.log(this.analyceSong.getAudioShape1().length + " controller S1");
        console.log(this.analyceSong.getAudioShape2().length + " controller S2");
        this.genet = new genetic_1.genetic(this.analyceSong.getAudioShape2());
        for (var index = 0; index < this.analyceSong.getAudioShape2().length; index++) {
            this.genet.makeFirstPopulaton(this.analyceSong.getAudioShape1()[index], index);
            console.log("Inicio");
            this.generateNewSong();
            console.log("A");
            this.genet.clear();
        }
    }
    //Para extraer datos de el analyce y recrear la cancion
    controller.prototype.generateNewSong = function () {
        var zoneAudio = this.genet.getActualPopulation(); // Como saber que elemento de la lista es(SUBIDA,BAJADA,...)
        //this.newAudioS1 = this.analyceSong.n(zoneAudio, this.newAudioS1);
        var cantIndividual = zoneAudio[Constants_1.constants.ASCENT].length + zoneAudio[Constants_1.constants.DESCENT].length +
            zoneAudio[Constants_1.constants.TERRACE].length + zoneAudio[Constants_1.constants.VALLEY].length + zoneAudio[Constants_1.constants.SILENCE].length;
        while (cantIndividual > 0) {
            for (var index = 0; index < zoneAudio.length; index++) {
                if (zoneAudio[index].length > 0) {
                    this.newAudioS1[Constants_1.constants.CHANNEL1] = this.newAudioS1[0].concat(this.analyceSong.getTypeShape(index, zoneAudio[index][zoneAudio.length - 1]));
                    zoneAudio[index].pop();
                }
            }
            cantIndividual = zoneAudio[Constants_1.constants.ASCENT].length + zoneAudio[Constants_1.constants.DESCENT].length +
                zoneAudio[Constants_1.constants.TERRACE].length + zoneAudio[Constants_1.constants.VALLEY].length + zoneAudio[Constants_1.constants.SILENCE].length;
        }
        this.newAudioS1[Constants_1.constants.CHANNEL2] = this.newAudioS1[Constants_1.constants.CHANNEL1];
    };
    controller.prototype.getNewSong = function () {
        return this.newAudioS1;
    };
    return controller;
}());
exports.controller = controller;
//# sourceMappingURL=controller.js.map