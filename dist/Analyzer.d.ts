export declare class analyzer {
    private audioShape1;
    private audioShape2;
    private ascent;
    private descent;
    private terrace;
    private valley;
    private silence;
    constructor(pAudioData1: number[], pAudioData2: number[]);
    private generateShape;
    private generateShape2;
    private generateShape3;
    private addFig;
    private getShape;
    private calculatePorcent;
    getAudioShape1(): number[][];
    getAudioShape2(): number[][];
}
