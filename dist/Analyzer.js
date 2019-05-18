"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./Constants");
var analyzer = /** @class */ (function () {
    function analyzer(pAudioData1, pAudioData2) {
        this.ascent = [];
        this.descent = [];
        this.terrace = [];
        this.valley = [];
        this.silence = [];
        this.audioShape2 = this.generateShape3(pAudioData2, Constants_1.constants.LENGTH_ZONE, true);
        this.audioShape1 = this.generateShape3(pAudioData1, Math.round((pAudioData1.length) / (this.audioShape2.length * 2)), false);
    }
    /*
    Este metodo me obtiene la cantidad de cada figura que aparecen por zonas
    [Subida, Bajada, Terraza, Valle, Silencio]
    */
    analyzer.prototype.generateShape = function (pAudioData, pLengthZone) {
        var result = [];
        var audioLength = pAudioData.length - 1;
        var difference = 0;
        var inclination = Constants_1.constants.ASCENT;
        var zone = 0;
        var height = Constants_1.constants.TERRACE;
        var shape = Constants_1.constants.ASCENT;
        result[0] = [0, 0, 0, 0, 0];
        for (var index = 0; index < audioLength; index++) {
            if (pAudioData[index + 1] < 0) {
                height = Constants_1.constants.VALLEY;
            }
            else if (pAudioData[index + 1] == 0) {
                height = Constants_1.constants.SILENCE;
            }
            difference = (pAudioData[index + 1] - pAudioData[index]) * 100;
            if (difference < 0) {
                inclination = Constants_1.constants.DESCENT;
            }
            shape = this.getShape(Math.abs(difference), inclination, height);
            inclination = Constants_1.constants.ASCENT;
            height = Constants_1.constants.TERRACE;
            result[zone][shape] += 1;
            if ((index + 1) % pLengthZone == 0) {
                zone++;
                result[zone] = [0, 0, 0, 0, 0];
            }
        }
        return result;
    };
    /*
    Este metodo me obtiene el porcentaje de aparicion de todas las figuras en la cancion
    [Subida, Bajada, Terraza, Valle, Silencio]
    */
    analyzer.prototype.generateShape2 = function (pAudioData) {
        var result = [];
        var audioLength = pAudioData.length - 1;
        var num = 0;
        var inclination = 0;
        var height = 2;
        var total = 0;
        var shape = 0;
        result = [0, 0, 0, 0, 0];
        for (var index = 0; index < audioLength; index++) {
            if (pAudioData[index + 1] < 0) {
                height = 3;
            }
            else if (pAudioData[index + 1] == 0) {
                height = 4;
            }
            num = (pAudioData[index + 1] - pAudioData[index]) * 100;
            if (num < 0) {
                inclination = 1;
            }
            shape = this.getShape(Math.abs(num), inclination, height);
            inclination = 0;
            height = 2;
            result[shape] += 1;
            total++;
        }
        console.log(result);
        result = this.calculatePorcent(result, total);
        return result;
    };
    /*
    Este metodo me obtiene el porcentaje de aparicion de las figuras en zonas de la cancion
    [Subida, Bajada, Terraza, Valle, Silencio]
    */
    analyzer.prototype.generateShape3 = function (pAudioData, pLengthZone, pSwitch) {
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
            case Constants_1.constants.SILENCE: {
                this.valley.push(pPoints);
                break;
            }
            default: {
                this.silence.push(pPoints);
                break;
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