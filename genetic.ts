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
        for(var index: number = 0; pS1.length > index; index++){
            for(var indexCromosoma: number = 0; pS1[index].length-1 > indexCromosoma; indexCromosoma++){
                var cantFig: number = Math.trunc(pS1[index][indexCromosoma]*pS1[index][5]);
                maxRandom = Math.trunc(pS1[index][indexCromosoma]*65535 + maxRandom);
                for(var indice: number = 0; cantFig > indice; indice++){
                    this.newPopulation.push(Math.trunc(Math.random()*(maxRandom - minRandom) + minRandom));
                }
                minRandom = maxRandom;
            }
        }
    }

    private fitness(){

    }

    private reproduction(pFather: number, pMother: number, pPopulation: number) {
        var random: number = 0;
        for (var index = 0; index < pPopulation; index++) {
            var kid: number;
            random = Math.floor(Math.random() *16);
            pFather = pFather >>(random);
            pFather = pFather <<(random);

            pMother = pMother <<(31-random);
            pMother = pMother >>(31-random);
            kid = pMother&pFather;
            if ((Math.random() * 100) < 6.35) {
                kid = this.mutation(kid);
            }
            this.newPopulation.push(kid);
        }
    }

    private mutation(pKid: number): number {
        var randomMutation: number = 0;
        randomMutation = Math.floor(Math.random() * 16);
        pKid = pKid ^ (Math.pow(2,randomMutation));
        return pKid;
    }
    
}