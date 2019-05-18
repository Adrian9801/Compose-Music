import { constants } from "./Constants";

export class genetic {
    private newPopulation: number[][];
    private actualPopulation: number[][];
    private modelo: number[][];
    private pivotInsert: number[];
    private totalShapeZone: number[];
    private optimalDistance: number;

    public constructor(pS2: number[][]) {
        this.newPopulation = [[],[],[],[],[]];
        this.pivotInsert = [];
        this.actualPopulation = [];
        this.totalShapeZone = [];
        this.modelo = pS2;
        this.optimalDistance = 0; 
    }

    public makeFirstPopulaton(pS1: number[], pZone:number) {
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
            this.optimalDistance += Math.abs(pS1[index] - this.modelo[pZone][index]);
        }
        for(var i: number = 0; constants.PORCENT_APROX <= this.optimalDistance; i++){
            for(var index: number = 0; constants.POS_TOTAL > index; index++){
                this.fitness(pZone,index);
            }
            this.getDistanceNewPopulation(pZone);
            if(this.getDistanceNewPopulation(pZone) < this.optimalDistance){
                this.actualPopulation = Object.assign([],this.newPopulation);
                this.optimalDistance = this.getDistanceNewPopulation(pZone);
            }
            this.newPopulation = [[],[],[],[],[]];
        }
        /*var cant: number = this.actualPopulation[0].length+this.actualPopulation[1].length+this.actualPopulation[2].length+
        this.actualPopulation[3].length+this.actualPopulation[4].length;
        console.log(this.actualPopulation[0].length/cant);
        console.log(this.actualPopulation[1].length/cant);
        console.log(this.actualPopulation[2].length/cant);
        console.log(this.actualPopulation[3].length/cant);
        console.log(this.actualPopulation[4].length/cant);
        console.log(cant);*/
    }

    private generatePopulation(pCantFig: number, pMinRandom: number, pMaxRandom: number, pIndexIndiv: number) {
        this.actualPopulation[pIndexIndiv] = [];
        for (var index: number = 0; pCantFig > index; index++) {
            this.actualPopulation[pIndexIndiv].push(Math.trunc(Math.random() * (pMaxRandom - pMinRandom) + pMinRandom));
        }
    }

    public clear(){
        this.newPopulation = [[],[],[],[],[]];
        this.pivotInsert = [];
        this.actualPopulation = [];
        this.totalShapeZone = [];
    }

    private getDistanceNewPopulation(pZone: number): number{
        var cant: number = this.newPopulation[constants.ASCENT].length+this.newPopulation[constants.DESCENT].length+
        this.newPopulation[constants.TERRACE].length+this.newPopulation[constants.VALLEY].length+this.newPopulation[constants.SILENCE].length;
        var distance = Math.abs((this.newPopulation[constants.ASCENT].length/cant) - this.modelo[pZone][constants.ASCENT])+
        Math.abs((this.newPopulation[constants.DESCENT].length/cant) - this.modelo[pZone][constants.DESCENT])
        +Math.abs((this.newPopulation[constants.TERRACE].length/cant) - this.modelo[pZone][constants.TERRACE])+ 
        Math.abs((this.newPopulation[constants.VALLEY].length/cant) - this.modelo[pZone][constants.VALLEY])
        +Math.abs((this.newPopulation[constants.SILENCE].length/cant) - this.modelo[pZone][constants.SILENCE]);
        return distance;
    }

    private fitness(pZone: number, pShape: number) {
        var indiviAccept: number[] = [];
        var shapePorcent: number = this.actualPopulation[pShape].length / this.totalShapeZone[pShape];
        var ponderate: number = this.modelo[pZone][pShape] / shapePorcent;
        var numHijos: number = 0;
        if(ponderate > 1){
            numHijos = (ponderate-1)*this.actualPopulation[pShape].length;
        }
        for (var index: number = 0; index < this.actualPopulation[pShape].length; index++) {
            if (Math.random() <= ponderate) {
                indiviAccept.push(this.actualPopulation[pShape][index]);
            }
        }
        var father: number = Math.floor(Math.random()*indiviAccept.length);
        var mother: number = Math.floor(Math.random()*indiviAccept.length);
        numHijos += indiviAccept.length;
        this.reproduction(indiviAccept[father], indiviAccept[mother], numHijos);
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

    public getActualPopulation(): number[][] {
        return this.actualPopulation;
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