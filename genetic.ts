import { constants } from "./Constants";

export class genetic {
    private newPopulation: number[][];
    private actualPopulation: number[][];
    private model: number[][];
    private pivotInsert: number[];
    private totalShapeZone: number[];
    private optimalDistance: number;
    private totalShape: number;

    public constructor() {
        this.newPopulation = [[], [], [], [], []];
        this.pivotInsert = [];
        this.actualPopulation = [];
        this.totalShapeZone = [];
        this.model = [];
        this.optimalDistance = 0;
        this.totalShape = 0;
    }

    public makeFirstPopulaton(pS1: number[], pZone: number) {
        var maxRandom: number = 0;
        var minRandom: number = 0;
        var cantFig: number = 0;
        var tipeShape = ["S", "B", "T", "V", "SS"];
        this.optimalDistance = 0;

        for (var index: number = 0; pS1.length - 1 > index; index++) {
            this.totalShape = pS1[constants.POS_TOTAL];
            cantFig = Math.trunc(pS1[index] * pS1[constants.POS_TOTAL]);
            maxRandom = Math.trunc(pS1[index] * constants.LENGTH_CROMOSOMA + maxRandom);
            console.log("|" + tipeShape[index] + "| PORCENT = " + pS1[index] + " | CANT = " + cantFig + " | MIN = " + minRandom + " | MAX = " + maxRandom + " | ");
            console.log("------------------------------------------- ");
            console.log();
            this.pivotInsert.push(maxRandom);
            this.totalShapeZone.push(pS1[constants.POS_TOTAL]);
            this.generatePopulation(cantFig, minRandom, maxRandom, index);
            minRandom = maxRandom;
            this.optimalDistance += Math.abs(pS1[index] - this.model[pZone][index]);
        }
        this.makePopulation(pZone);

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

    }

    private generatePopulation(pCantFig: number, pMinRandom: number, pMaxRandom: number, pIndexIndiv: number) {
        this.actualPopulation[pIndexIndiv] = [];
        for (var index: number = 0; pCantFig > index; index++) {
            this.actualPopulation[pIndexIndiv].push(Math.trunc(Math.random() * (pMaxRandom - pMinRandom) + pMinRandom));
        }

    }

    private makePopulation(pZone: number){
        for(var i: number = 0; constants.PORCENT_APROX <= this.optimalDistance; i++){
            for(var index: number = 0; constants.POS_TOTAL > index; index++){
                this.fitness(pZone,index);
            }
            if(this.getDistanceNewPopulation(pZone) < this.optimalDistance){
                this.actualPopulation = Object.assign([],this.newPopulation);
                this.optimalDistance = this.getDistanceNewPopulation(pZone);
            }
            this.newPopulation = [[],[],[],[],[]];
        }
    }

    public setModel(pModel: number[][]) {
        this.model = pModel;
    }

    public clear() {
        this.newPopulation = [[], [], [], [], []];
        this.pivotInsert = [];
        this.actualPopulation = [];
        this.totalShapeZone = [];
    }

    private getDistanceNewPopulation(pZone: number): number {
        this.totalShape = this.newPopulation[constants.ASCENT].length + this.newPopulation[constants.DESCENT].length +
            this.newPopulation[constants.TERRACE].length + this.newPopulation[constants.VALLEY].length + this.newPopulation[constants.SILENCE].length;
        var distance = Math.abs((this.newPopulation[constants.ASCENT].length / this.totalShape) - this.model[pZone][constants.ASCENT]) +
            Math.abs((this.newPopulation[constants.DESCENT].length / this.totalShape) - this.model[pZone][constants.DESCENT])
            + Math.abs((this.newPopulation[constants.TERRACE].length / this.totalShape) - this.model[pZone][constants.TERRACE]) +
            Math.abs((this.newPopulation[constants.VALLEY].length / this.totalShape) - this.model[pZone][constants.VALLEY])
            + Math.abs((this.newPopulation[constants.SILENCE].length / this.totalShape) - this.model[pZone][constants.SILENCE]);
        return distance;
    }

    private fitness(pZone: number, pShape: number) {
        var indiviAccept: number[] = [];
        var shapePorcent: number = this.actualPopulation[pShape].length / this.totalShapeZone[pShape];
        var ponderate: number = this.model[pZone][pShape] / shapePorcent;
        var numHijos: number = 0;
        if (ponderate > constants.PONDERATE) {
            numHijos = (ponderate - constants.PONDERATE) * this.actualPopulation[pShape].length;
        }
        for (var index: number = 0; index < this.actualPopulation[pShape].length; index++) {
            if (Math.random() <= ponderate) {
                indiviAccept.push(this.actualPopulation[pShape][index]);
            }
        }
        var father: number = Math.floor(Math.random() * indiviAccept.length);
        var mother: number = Math.floor(Math.random() * indiviAccept.length);
        numHijos += indiviAccept.length;
        this.reproduction(indiviAccept[father], indiviAccept[mother], numHijos);
    }

    private reproduction(pFather: number, pMother: number, pPopulation: number) {
        var random: number = 0;
        var mask: number = 0;
        for (var index = 0; index < pPopulation; index++) {
            var kid: number;
            random = Math.floor(Math.random() * constants.BITS_CROMOSOMA);
            pFather = pFather >> (random);
            pFather = pFather << (random);
            
            mask = pMother >> (random);
            mask = mask << (random);
            pMother = pMother ^ pFather;
            kid = pMother | pFather;
            if ((Math.random() * constants.TOTAL_PORCENT) < constants.MUTATION) {
                kid = this.mutation(kid);
            }
            this.insertKid(kid);
        }
    }

    private insertKid(pKid: number) {
        for (var index: number = 0; index < this.newPopulation.length; index++) {
            if (this.pivotInsert[index] >= pKid) {
                this.newPopulation[index].push(pKid);
                break;
            }
        }
    }

    private mutation(pKid: number): number {
        var randomMutation: number = 0;
        randomMutation = Math.floor(Math.random() * constants.BITS_CROMOSOMA);
        pKid = pKid ^ (Math.pow(constants.BINARYBASE, randomMutation));
        return pKid;
    }

    public getActualPopulation(): number[][] {
        return this.actualPopulation;
    }
}