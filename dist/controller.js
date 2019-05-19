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
        this.analyceSong = new Analyzer_1.analyzer();
        this.genet = new genetic_1.genetic();
        for (var channel = 0; channel < Constants_1.constants.CHANNELCANT; channel++) {
            console.log("//////////////// " + channel + "////////////////");
            console.log();
            this.analyceSong.makeShape(pAudioS1.channelData[channel], pAudioS2.channelData[channel]);
            this.genet.setModel(this.analyceSong.getAudioShape2());
            for (var index = 0; index < this.analyceSong.getAudioShape2().length; index++) {
                console.log("//////////////// " + index + "////////////////");
                console.log("----------------S2 Model------------------- ");
                console.log("|S | " + this.analyceSong.getAudioShape2()[index][0] + "| ");
                console.log("------------------------------------------- ");
                console.log("|B | " + this.analyceSong.getAudioShape2()[index][1] + "| ");
                console.log("------------------------------------------- ");
                console.log("|T | " + this.analyceSong.getAudioShape2()[index][2] + "| ");
                console.log("------------------------------------------- ");
                console.log("|V | " + this.analyceSong.getAudioShape2()[index][3] + "| ");
                console.log("------------------------------------------- ");
                console.log("|SS| " + this.analyceSong.getAudioShape2()[index][4] + "| ");
                console.log("------------------------------------------- ");
                console.log("----------------S1 Beagins------------------- ");
                this.genet.makeFirstPopulaton(this.analyceSong.getAudioShape1()[index], index);
                console.log();
                this.generateNewSong(channel);
                this.genet.clear();
            }
            this.analyceSong.clear();
        }
    }
    //Para extraer datos de el analyce y recrear la cancion
    controller.prototype.generateNewSong = function (pChannel) {
        var zoneAudio = this.genet.getActualPopulation();
        var inclination = [];
        var index;
        var cantIndividual = zoneAudio[Constants_1.constants.ASCENT].length + zoneAudio[Constants_1.constants.DESCENT].length +
            zoneAudio[Constants_1.constants.TERRACE].length + zoneAudio[Constants_1.constants.VALLEY].length + zoneAudio[Constants_1.constants.SILENCE].length;
        while (cantIndividual > 0) {
            index = Math.floor(Math.random() * Constants_1.constants.POS_TOTAL);
            if (zoneAudio[index].length > 0) {
                inclination = this.analyceSong.getTypeShape(index, zoneAudio[index][zoneAudio[index].length - 1]);
                this.newAudioS1[pChannel].push(inclination[Constants_1.constants.POINT1]);
                this.newAudioS1[pChannel].push(inclination[Constants_1.constants.POINT2]);
                zoneAudio[index].pop();
                cantIndividual--;
            }
        }
    };
    controller.prototype.getNewSong = function () {
        return this.newAudioS1;
    };
    return controller;
}());
exports.controller = controller;
//# sourceMappingURL=controller.js.map