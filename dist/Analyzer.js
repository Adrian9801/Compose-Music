"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./Constants");
var analyzer = /** @class */ (function () {
    function analyzer() {
        this.ascent = [];
        this.descent = [];
        this.terrace = [];
        this.valley = [];
        this.silence = [];
        this.audioShape2 = [];
        this.audioShape1 = [];
    }
    analyzer.prototype.makeShape = function (pAudioData1, pAudioData2) {
        this.audioShape2 = this.generateShape(pAudioData2, Constants_1.constants.LENGTH_ZONE, true);
        var zoneCant = Math.round((pAudioData1.length) / (this.audioShape2.length * 2));
        this.audioShape1 = this.generateShape(pAudioData1, zoneCant, false);
    };
    /*
    Este metodo me obtiene el porcentaje de aparicion de las figuras en zonas de la cancion
    [Subida, Bajada, Terraza, Valle, Silencio]
    */
    analyzer.prototype.generateShape = function (pAudioData, pLengthZone, pSwitch) {
        pLengthZone = pLengthZone | 1;
        var result = [];
        var audioLength = pAudioData.length - 1;
        var difference = 0;
        var inclination = Constants_1.constants.ASCENT;
        var zone = 0;
        var height = Constants_1.constants.TERRACE;
        var shape = Constants_1.constants.ASCENT;
        result[0] = [0, 0, 0, 0, 0, 0];
        for (var index = 0; index < audioLength; index += 2) {
            if (pAudioData[index + 1] < 0) {
                height = Constants_1.constants.VALLEY;
            }
            else if (pAudioData[index + 1] == 0) {
                height = Constants_1.constants.SILENCE;
            }
            difference = (pAudioData[index + 1] - pAudioData[index]) * Constants_1.constants.TOTAL_PORCENT;
            if (difference < 0) {
                inclination = Constants_1.constants.DESCENT;
            }
            shape = this.getShape(Math.abs(difference), inclination, height);
            this.addFig(shape, [pAudioData[index], pAudioData[index + 1]]);
            inclination = Constants_1.constants.ASCENT;
            height = Constants_1.constants.TERRACE;
            result[zone][shape] += 1;
            if (((index + 1) % (pLengthZone) == 0) && (pSwitch || this.audioShape2.length > result.length)) {
                zone++;
                result[zone] = [0, 0, 0, 0, 0, 0];
            }
        }
        var total = 0;
        for (var index = 0; index < result.length; index++) {
            total = result[index][Constants_1.constants.ASCENT] + result[index][Constants_1.constants.DESCENT] +
                result[index][Constants_1.constants.TERRACE] + result[index][Constants_1.constants.VALLEY] + result[index][Constants_1.constants.SILENCE];
            result[index] = this.calculatePorcent(result[index], total);
            result[index][Constants_1.constants.POS_TOTAL] = total;
        }
        return result;
    };
    analyzer.prototype.clear = function () {
        this.ascent = [];
        this.descent = [];
        this.terrace = [];
        this.valley = [];
        this.silence = [];
        this.audioShape1 = [];
        this.audioShape2 = [];
    };
    analyzer.prototype.addFig = function (pShape, pPoints) {
        switch (pShape) {
            case Constants_1.constants.ASCENT: {
                this.ascent.push(pPoints);
                break;
            }
            case Constants_1.constants.DESCENT: {
                this.descent.push(pPoints);
                break;
            }
            case Constants_1.constants.TERRACE: {
                this.terrace.push(pPoints);
                break;
            }
            case Constants_1.constants.VALLEY: {
                this.valley.push(pPoints);
                break;
            }
            default: {
                this.silence.push(pPoints);
                break;
            }
        }
    };
    analyzer.prototype.getTypeShape = function (pShape, pIndividual) {
        switch (pShape) {
            case Constants_1.constants.ASCENT: {
                return this.ascent[pIndividual % this.ascent.length];
            }
            case Constants_1.constants.DESCENT: {
                return this.descent[pIndividual % this.descent.length];
            }
            case Constants_1.constants.TERRACE: {
                return this.terrace[pIndividual % this.terrace.length];
            }
            case Constants_1.constants.VALLEY: {
                return this.valley[pIndividual % this.valley.length];
            }
            default: {
                return this.silence[pIndividual % this.silence.length];
            }
        }
    };
    analyzer.prototype.getShape = function (pDiference, pSigno, pHeight) {
        if (pDiference < Constants_1.constants.PORCENT_FLAT) {
            pSigno = pHeight;
        }
        return pSigno;
    };
    analyzer.prototype.calculatePorcent = function (pResult, pTotal) {
        for (var index = 0; index < pResult.length - 1; index++) {
            pResult[index] = pResult[index] / pTotal;
        }
        return pResult;
    };
    analyzer.prototype.getAudioShape1 = function () {
        return this.audioShape1;
    };
    analyzer.prototype.getAudioShape2 = function () {
        return this.audioShape2;
    };
    return analyzer;
}());
exports.analyzer = analyzer;
//# sourceMappingURL=Analyzer.js.map