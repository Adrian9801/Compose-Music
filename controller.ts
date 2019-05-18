import { analyzer } from "./Analyzer";
import { genetic } from "./genetic";
import { constants } from "./Constants";

export class controller {
    private audioS1: any;
    private newAudioS1: number[][];
    private audioS2: any;
    private genet: genetic;
    private analyceSong: analyzer;

    public constructor(pAudioS1: any, pAudioS2: any) {
        this.audioS1 = pAudioS1;
        this.audioS2 = pAudioS2;
        this.newAudioS1 = [[],[]];
        this.analyceSong = new analyzer(pAudioS1.channelData[0], pAudioS2.channelData[0]);
        console.log(this.analyceSong.getAudioShape1().length + " controller S1");
        console.log(this.analyceSong.getAudioShape2().length + " controller S2");
        this.genet = new genetic(this.analyceSong.getAudioShape2());
        for (var index: number = 0; index < this.analyceSong.getAudioShape2().length; index++) {
            this.genet.makeFirstPopulaton(this.analyceSong.getAudioShape1()[index], index);
            console.log("Inicio");
            this.generateNewSong();
            console.log("A");
            this.genet.clear();
        }

    }

    //Para extraer datos de el analyce y recrear la cancion
    private generateNewSong() {
        var zoneAudio: number[][] = this.genet.getActualPopulation();// Como saber que elemento de la lista es(SUBIDA,BAJADA,...)
        //this.newAudioS1 = this.analyceSong.n(zoneAudio, this.newAudioS1);
        var cantIndividual: number = zoneAudio[constants.ASCENT].length + zoneAudio[constants.DESCENT].length +
            zoneAudio[constants.TERRACE].length + zoneAudio[constants.VALLEY].length + zoneAudio[constants.SILENCE].length;
        while (cantIndividual > 0) {
            for (var index: number = 0; index < zoneAudio.length; index++) {
                if (zoneAudio[index].length > 0) {
                    this.newAudioS1[constants.CHANNEL1] = this.newAudioS1[0].concat(this.analyceSong.getTypeShape(index, zoneAudio[index][zoneAudio.length - 1]));
                    zoneAudio[index].pop();
                }
            }
            cantIndividual = zoneAudio[constants.ASCENT].length + zoneAudio[constants.DESCENT].length +
            zoneAudio[constants.TERRACE].length + zoneAudio[constants.VALLEY].length + zoneAudio[constants.SILENCE].length;
        }
        this.newAudioS1[constants.CHANNEL2] = this.newAudioS1[constants.CHANNEL1];
    }

    public getNewSong() : number[][]{
        return this.newAudioS1;
    }

}