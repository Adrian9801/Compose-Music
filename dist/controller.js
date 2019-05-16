"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Analyzer_1 = require("./Analyzer");
var controller = /** @class */ (function () {
    function controller(pAudioS1, pAudioS2) {
        this.audioS1 = pAudioS1;
        this.audioS2 = pAudioS2;
        var analyceSong = new Analyzer_1.analyzer(pAudioS1.channelData[0]);
        console.log(analyceSong.getAudioShape());
    }
    return controller;
}());
exports.controller = controller;
//# sourceMappingURL=controller.js.map