export declare class analyzer {
    private audioShape1;
    private audioShape2;
    private ascent;
    private descent;
    private terrace;
    private valley;
    private silence;
    constructor();
    makeShape(pAudioData1: number[], pAudioData2: number[]): void;
    private generateShape;
    clear(): void;
    private addFig;
    getTypeShape(pShape: number, pIndividual: number): number[];
    private getShape;
    private calculatePorcent;
    getAudioShape1(): number[][];
    getAudioShape2(): number[][];
}
