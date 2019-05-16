import { analyzer } from "./Analyzer";

export class controller {
    private audioS1: any;
    private audioS2: any;

    public constructor(pAudioS1: any, pAudioS2: any) {
        this.audioS1 = pAudioS1;
        this.audioS2 = pAudioS2;
        var analyceSong = new analyzer(pAudioS1.channelData[0]);
        console.log(analyceSong.getAudioShape());
    }

}