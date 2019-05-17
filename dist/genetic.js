"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var genetic = /** @class */ (function () {
    function genetic() {
        this.newPopulation = [];
        //this.makeFirstPopulaton();
    }
    genetic.prototype.makeFirstPopulaton = function (pS1) {
        var maxRandom = 0;
        var minRandom = 0;
        for (var index = 0; pS1.length > index; index++) {
            for (var indexCromosoma = 0; pS1[index].length - 1 > indexCromosoma; indexCromosoma++) {
                var cantFig = Math.trunc(pS1[index][indexCromosoma] * pS1[index][5]);
                maxRandom = Math.trunc(pS1[index][indexCromosoma] * 65535 + maxRandom);
                for (var indice = 0; cantFig > indice; indice++) {
                    this.newPopulation.push(Math.trunc(Math.random() * (maxRandom - minRandom) + minRandom));
                }
                minRandom = maxRandom;
            }
        }
    };
    return genetic;
}());
exports.genetic = genetic;
//# sourceMappingURL=genetic.js.map