import { constants } from "./Constants";

export class genetic{
        private newPopulation: number[];
        private modelo: number[][];

    public constructor(pS1: number[][], pS2: number[][]){
        this.newPopulation = [];
        this.modelo = pS2;
        this.makeFirstPopulaton(pS1);
    }

    private makeFirstPopulaton(pS1: number[][]){
        var maxRandom: number = 0;
        var minRandom: number = 0;
        var cantFig: number = 0;
        for(var index: number = 0; pS1.length > index; index++){
            for(var indexCromosoma: number = 0; pS1[index].length-1 > indexCromosoma; indexCromosoma++){
                cantFig = Math.trunc(pS1[index][indexCromosoma]*pS1[index][constants.POS_TOTAL]);
                maxRandom = Math.trunc(pS1[index][indexCromosoma]*constants.LENGTH_CROMOSOMA + maxRandom);
                this.generatePopulation(cantFig, minRandom, maxRandom);
                minRandom = maxRandom;
            }
        }
    }

    private generatePopulation(pCantFig: number, pMinRandom: number, pMaxRandom: number){
        for(var index: number = 0; pCantFig > index; index++){
            this.newPopulation.push(Math.trunc(Math.random()*(pMaxRandom - pMinRandom) + pMinRandom));
        }
    }

    private fitness(){

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
            this.newPopulation.push(kid);
        }
    }

    private mutation(pKid: number): number {
        var randomMutation: number = 0;
        randomMutation = Math.floor(Math.random()*constants.BITS_CROMOSOMA);
        pKid = pKid ^ (Math.pow(2,randomMutation));
        return pKid;
    }
    
    public getNewPopulation(): number[]{
        return this.newPopulation;
    }

}