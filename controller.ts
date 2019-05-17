import { analyzer } from "./Analyzer";
import { genetic } from "./genetic";

export class controller {
    private audioS1: any;
    private audioS2: any;
    private genet: genetic;

    public constructor(pAudioS1: any, pAudioS2: any) {
        this.audioS1 = pAudioS1;
        this.audioS2 = pAudioS2;
        var analyceSong = new analyzer(pAudioS1.channelData[0]);
        var analyceSong2 = new analyzer(pAudioS2.channelData[0]);
        this.genet = new genetic(analyceSong.getAudioShape(), analyceSong2.getAudioShape());
    }
    //Para extraer datos de el analyce y recrear la cancion
    private generateNewSong(){
        this.genet.getNewPopulation();// Como saber que elemento de la lista es(SUBIDA,BAJADA,...)
    }

    public getNewSong(){

    }

}