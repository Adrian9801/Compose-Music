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
        this.newAudioS1 = [[], []];
        this.analyceSong = new analyzer();
        this.genet = new genetic();
        for (var channel: number = 0; channel < constants.CHANNELCANT; channel++) {
            this.analyceSong.makeShape(pAudioS1.channelData[channel], pAudioS2.channelData[channel]);
            this.genet.setModel(this.analyceSong.getAudioShape2());
            for (var index: number = 0; index < this.analyceSong.getAudioShape2().length; index++) {
                this.genet.makeFirstPopulaton(this.analyceSong.getAudioShape1()[index], index);
                this.generateNewSong(channel);
                this.genet.clear();
            }
            this.analyceSong.clear();
        }
    }

    //Para extraer datos de el analyce y recrear la cancion
    private generateNewSong(pChannel: number) {
        var zoneAudio: number[][] = this.genet.getActualPopulation();
        var inclination: number[] = [];
        var index: number;
        var cantIndividual: number = zoneAudio[constants.ASCENT].length + zoneAudio[constants.DESCENT].length +
            zoneAudio[constants.TERRACE].length + zoneAudio[constants.VALLEY].length + zoneAudio[constants.SILENCE].length;
        while (cantIndividual > 0) {
            index = Math.floor(Math.random() * constants.POS_TOTAL);
            if (zoneAudio[index].length > 0) {
                inclination = this.analyceSong.getTypeShape(index, zoneAudio[index][zoneAudio[index].length - 1]);
                this.newAudioS1[pChannel].push(inclination[constants.POINT1]);
                this.newAudioS1[pChannel].push(inclination[constants.POINT2]);
                zoneAudio[index].pop();
                cantIndividual--;
            }
        }
    }

    public getNewSong(): number[][] {
        return this.newAudioS1;
    }

}