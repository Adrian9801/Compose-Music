"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./Constants");
var genetic = /** @class */ (function () {
    function genetic() {
        this.newPopulation = [[], [], [], [], []];
        this.pivotInsert = [];
        this.actualPopulation = [];
        this.totalShapeZone = [];
        this.model = [];
        this.optimalDistance = 0;
        this.totalShape = 0;
    }
    genetic.prototype.makeFirstPopulaton = function (pS1, pZone) {
        var maxRandom = 0;
        var minRandom = 0;
        var cantFig = 0;
        var tipeShape = ["S", "B", "T", "V", "SS"];
        this.optimalDistance = 0;
        for (var index = 0; pS1.length - 1 > index; index++) {
            this.totalShape = pS1[Constants_1.constants.POS_TOTAL];
            cantFig = Math.trunc(pS1[index] * pS1[Constants_1.constants.POS_TOTAL]);
            maxRandom = Math.trunc(pS1[index] * Constants_1.constants.LENGTH_CROMOSOMA + maxRandom);
            console.log("|" + tipeShape[index] + "| PORCENT = " + pS1[index] + " | CANT = " + cantFig + " | MIN = " + minRandom + " | MAX = " + maxRandom + " | ");
            console.log("------------------------------------------- ");
            this.pivotInsert.push(maxRandom);
            this.totalShapeZone.push(pS1[Constants_1.constants.POS_TOTAL]);
            this.generatePopulation(cantFig, minRandom, maxRandom, index);
            minRandom = maxRandom;
            this.optimalDistance += Math.abs(pS1[index] - this.model[pZone][index]);
        }
        for (var i = 0; Constants_1.constants.PORCENT_APROX <= this.optimalDistance; i++) {
            for (var index = 0; Constants_1.constants.POS_TOTAL > index; index++) {
                this.fitness(pZone, index);
            }
            this.getDistanceNewPopulation(pZone);
            if (this.getDistanceNewPopulation(pZone) < this.optimalDistance) {
                this.actualPopulation = Object.assign([], this.newPopulation);
                this.optimalDistance = this.getDistanceNewPopulation(pZone);
            }
            this.newPopulation = [[], [], [], [], []];
        }
        console.log("//////////////// NEW GENERATION ////////////////");
        console.log("------------------------------------------------ ");
        console.log("|S | PORCENT = " + this.actualPopulation[0].length / this.totalShape + " | CANT = " + this.actualPopulation[0].length + "|");
        console.log("------------------------------------------- ");
        console.log("|B | PORCENT = " + this.actualPopulation[1].length / this.totalShape + " | CANT = " + this.actualPopulation[1].length + "|");
        console.log("------------------------------------------- ");
        console.log("|T | PORCENT = " + this.actualPopulation[2].length / this.totalShape + " | CANT = " + this.actualPopulation[2].length + "|");
        console.log("------------------------------------------- ");
        console.log("|V | PORCENT = " + this.actualPopulation[3].length / this.totalShape + " | CANT = " + this.actualPopulation[3].length + "|");
        console.log("------------------------------------------- ");
        console.log("|SS| PORCENT = " + this.actualPopulation[4].length / this.totalShape + " | CANT = " + this.actualPopulation[4].length + "|");
        console.log("------------------------------------------------ ");
    };
    genetic.prototype.generatePopulation = function (pCantFig, pMinRandom, pMaxRandom, pIndexIndiv) {
        this.actualPopulation[pIndexIndiv] = [];
        for (var index = 0; pCantFig > index; index++) {
            this.actualPopulation[pIndexIndiv].push(Math.trunc(Math.random() * (pMaxRandom - pMinRandom) + pMinRandom));
        }
    };
    genetic.prototype.setModel = function (pModel) {
        this.model = pModel;
    };
    genetic.prototype.clear = function () {
        this.newPopulation = [[], [], [], [], []];
        this.pivotInsert = [];
        this.actualPopulation = [];
        this.totalShapeZone = [];
    };
    genetic.prototype.getDistanceNewPopulation = function (pZone) {
        this.totalShape = this.newPopulation[Constants_1.constants.ASCENT].length + this.newPopulation[Constants_1.constants.DESCENT].length +
            this.newPopulation[Constants_1.constants.TERRACE].length + this.newPopulation[Constants_1.constants.VALLEY].length + this.newPopulation[Constants_1.constants.SILENCE].length;
        var distance = Math.abs((this.newPopulation[Constants_1.constants.ASCENT].length / this.totalShape) - this.model[pZone][Constants_1.constants.ASCENT]) +
            Math.abs((this.newPopulation[Constants_1.constants.DESCENT].length / this.totalShape) - this.model[pZone][Constants_1.constants.DESCENT])
            + Math.abs((this.newPopulation[Constants_1.constants.TERRACE].length / this.totalShape) - this.model[pZone][Constants_1.constants.TERRACE]) +
            Math.abs((this.newPopulation[Constants_1.constants.VALLEY].length / this.totalShape) - this.model[pZone][Constants_1.constants.VALLEY])
            + Math.abs((this.newPopulation[Constants_1.constants.SILENCE].length / this.totalShape) - this.model[pZone][Constants_1.constants.SILENCE]);
        return distance;
    };
    genetic.prototype.fitness = function (pZone, pShape) {
        var indiviAccept = [];
        var shapePorcent = this.actualPopulation[pShape].length / this.totalShapeZone[pShape];
        var ponderate = this.model[pZone][pShape] / shapePorcent;
        var numHijos = 0;
        if (ponderate > Constants_1.constants.PONDERATE) {
            numHijos = (ponderate - 1) * this.actualPopulation[pShape].length;
        }
        for (var index = 0; index < this.actualPopulation[pShape].length; index++) {
            if (Math.random() <= ponderate) {
                indiviAccept.push(this.actualPopulation[pShape][index]);
            }
        }
        var father = Math.floor(Math.random() * indiviAccept.length);
        var mother = Math.floor(Math.random() * indiviAccept.length);
        numHijos += indiviAccept.length;
        this.reproduction(indiviAccept[father], indiviAccept[mother], numHijos);
    };
    genetic.prototype.reproduction = function (pFather, pMother, pPopulation) {
        var random = 0;
        for (var index = 0; index < pPopulation; index++) {
            var kid;
            random = Math.floor(Math.random() * Constants_1.constants.BITS_CROMOSOMA);
            pFather = pFather >> (random);
            pFather = pFather << (random);
            pMother = pMother << (Constants_1.constants.BITS_NUMBER - random);
            pMother = pMother >> (Constants_1.constants.BITS_NUMBER - random);
            kid = pMother & pFather;
            if ((Math.random() * Constants_1.constants.TOTAL_PORCENT) < Constants_1.constants.MUTATION) {
                kid = this.mutation(kid);
            }
            this.insertKid(kid);
        }
    };
    genetic.prototype.insertKid = function (pKid) {
        for (var index = 0; index < this.newPopulation.length; index++) {
            if (this.pivotInsert[index] >= pKid) {
                this.newPopulation[index].push(pKid);
                break;
            }
        }
    };
    genetic.prototype.mutation = function (pKid) {
        var randomMutation = 0;
        randomMutation = Math.floor(Math.random() * Constants_1.constants.BITS_CROMOSOMA);
        pKid = pKid ^ (Math.pow(Constants_1.constants.BINARYBASE, randomMutation));
        return pKid;
    };
    genetic.prototype.getActualPopulation = function () {
        return this.actualPopulation;
    };
    return genetic;
}());
exports.genetic = genetic;
//# sourceMappingURL=genetic.js.map