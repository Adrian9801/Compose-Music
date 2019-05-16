"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./Constants");
var analyzer = /** @class */ (function () {
    function analyzer(pAudioData) {
        this.AudioShape = this.generateShape3(pAudioData);
    }
    /*
    Este metodo me obtiene la cantidad de cada figura que aparecen por zonas
    [Subida, Bajada, Terraza, Valle, Silencio]
    */
    analyzer.prototype.generateShape = function (pAudioData) {
        var result = [];
        var audioLength = pAudioData.length - 1;
        var num = 0;
        var inclination = 0;
        var pos = 0;
        var height = 2;
        var shape = 0;
        result[0] = [0, 0, 0, 0, 0];
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
            result[pos][shape] += 1;
            if ((index + 1) % Constants_1.constants.TAMGEN == 0) {
                pos++;
                result[pos] = [0, 0, 0, 0, 0];
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
    analyzer.prototype.generateShape3 = function (pAudioData) {
        var result = [];
        var audioLength = pAudioData.length - 1;
        var num = 0;
        var inclination = 0;
        var pos = 0;
        var height = 2;
        var shape = 0;
        result[0] = [0, 0, 0, 0, 0];
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
            result[pos][shape] += 1;
            if ((index + 1) % Constants_1.constants.TAMGEN == 0) {
                pos++;
                result[pos] = [0, 0, 0, 0, 0];
            }
        }
        var total = 0;
        for (var index = 0; index < result.length; index++) {
            total = result[index][0] + result[index][1] + result[index][2] + result[index][3] + result[index][4];
            result[index] = this.calculatePorcent(result[index], total);
        }
        return result;
    };
    analyzer.prototype.getShape = function (pDiference, pSigno, pHeight) {
        if (pDiference < 0.1) {
            pSigno = pHeight;
        }
        return pSigno;
    };
    analyzer.prototype.calculatePorcent = function (pResult, pTotal) {
        for (var index = 0; index < pResult.length; index++) {
            pResult[index] = (pResult[index] / pTotal) * 100;
        }
        return pResult;
    };
    analyzer.prototype.getAudioShape = function () {
        return this.AudioShape;
    };
    return analyzer;
}());
exports.analyzer = analyzer;
//# sourceMappingURL=Analyzer.js.map