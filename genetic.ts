import { constants } from "./Constants";

export class genetic {
    private newPopulation: number[][];
    private modelo: number[][];
    private pivotInsert: number[];
    private totalShapeZone: number[];

    public constructor(pS1: number[][], pS2: number[][]) {
        this.newPopulation = [];
        this.pivotInsert = [];
        this.totalShapeZone = [];
        this.modelo = pS2;
        this.makeFirstPopulaton(pS1[0]);
    }

    private makeFirstPopulaton(pS1: number[]) {
        var maxRandom: number = 0;
        var minRandom: number = 0;
        var cantFig: number = 0;
        for (var index: number = 0; pS1.length - 1 > index; index++) {
            cantFig = Math.trunc(pS1[index] * pS1[constants.POS_TOTAL]);
            maxRandom = Math.trunc(pS1[index] * constants.LENGTH_CROMOSOMA + maxRandom);
            this.pivotInsert.push(maxRandom);
            this.totalShapeZone.push(pS1[constants.POS_TOTAL]);
            this.generatePopulation(cantFig, minRandom, maxRandom, index);
            minRandom = maxRandom;
        }
    }

    private generatePopulation(pCantFig: number, pMinRandom: number, pMaxRandom: number, pIndexIndiv: number) {
        for (var index: number = 0; pCantFig > index; index++) {
            this.newPopulation[pIndexIndiv].push(Math.trunc(Math.random() * (pMaxRandom - pMinRandom) + pMinRandom));
        }
    }

    private fitness(pZone: number) {
        var indiviAccept: number[][] = [];
        var shapePorcent: number = 0;
        for (var index: number = 0; index < this.newPopulation[pZone].length; index++) {
            shapePorcent = this.newPopulation[pZone].length / this.totalShapeZone[pZone];
            if (Math.random() <= this.modelo[pZone][index] / shapePorcent) {
                indiviAccept[pZone].push(this.newPopulation[pZone][index]);
            }
        }
    }

    private reproduction(pFather: number, pMother: number, pPopulation: number) {
        var random: number = 0;
        for (var index = 0; index < pPopulation; index++) {
            var kid: number;
            random = Math.floor(Math.random() * constants.BITS_CROMOSOMA);
            pFather = pFather >> (random);
            pFather = pFather << (random);

            pMother = pMother << (constants.BITS_NUMBER - random);
            pMother = pMother >> (constants.BITS_NUMBER - random);
            kid = pMother & pFather;
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
        pKid = pKid ^ (Math.pow(2, randomMutation));
        return pKid;
    }

    public getNewPopulation(): number[][] {
        return this.newPopulation;
    }





    /*

    private newPopulation: number[][];
        private modelo: number[][];
        private pivotInsert: number [];
        private totalShapeZone: number[];

    public constructor(pS1: number[][], pS2: number[][]){
        this.newPopulation = [];
        this.pivotInsert = [];
        this.totalShapeZone = [];
        this.modelo = pS2;
        this.makeFirstPopulaton(pS1);
    }

    private makeFirstPopulaton(pS1: number[][]){
        var maxRandom: number = 0;
        var minRandom: number = 0;
        var cantFig: number = 0;
        for(var index: number = 0; pS1.length > index; index++){
            for(var indexIndiv: number = 0; pS1[index].length-1 > indexIndiv; indexIndiv++){
                cantFig = Math.trunc(pS1[index][indexIndiv]*pS1[index][constants.POS_TOTAL]);
                maxRandom = Math.trunc(pS1[index][indexIndiv]*constants.LENGTH_CROMOSOMA + maxRandom);
                this.pivotInsert.push(maxRandom);
                this.totalShapeZone.push(pS1[index][constants.POS_TOTAL]);
                this.generatePopulation(cantFig, minRandom, maxRandom, indexIndiv);
                minRandom = maxRandom;
            }
        }
    }

    private generatePopulation(pCantFig: number, pMinRandom: number, pMaxRandom: number, pIndexIndiv: number){
        for(var index: number = 0; pCantFig > index; index++){
            this.newPopulation[pIndexIndiv].push(Math.trunc(Math.random()*(pMaxRandom - pMinRandom) + pMinRandom));
        }
    }

    private fitness(pZone: number){
        var indiviAccept: number [][] = [];
        var shapePorcent: number = 0;
        for(var index: number = 0; index < this.newPopulation[pZone].length; index++){
            shapePorcent =this.newPopulation[pZone].length/this.totalShapeZone[pZone];
            if(Math.random() <= this.modelo[pZone][index]/){
                indiviAccept[pZone].push(this.);
            }
        }
    }

    private reproduction(pFather: number, pMother: number, pPopulation: number) {
        var random: number = 0;
        for (var index = 0; index < pPopulation; index++) {
            var kid: number;
            random = Math.floor(Math.random()*constants.BITS_CROMOSOMA);
            pFather = pFather >>(random);
            pFather = pFather <<(random);

            pMother = pMother <<(constants.BITS_NUMBER-random);
            pMother = pMother >>(constants.BITS_NUMBER-random);
            kid = pMother&pFather;
            if ((Math.random() * constants.TOTAL_PORCENT) < constants.MUTATION) {
                kid = this.mutation(kid);
            }
            this.insertKid(kid);
        }
    }

    private insertKid(pKid: number){
        for(var index: number = 0; index < this.newPopulation.length; index++){
            if(this.pivotInsert[index] >= pKid){
                this.newPopulation[index].push(pKid);
                break;
            }
        }
    }

    private mutation(pKid: number): number {
        var randomMutation: number = 0;
        randomMutation = Math.floor(Math.random()*constants.BITS_CROMOSOMA);
        pKid = pKid ^ (Math.pow(2,randomMutation));
        return pKid;
    }
    */
}