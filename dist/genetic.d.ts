export declare class genetic {
    private newPopulation;
    private actualPopulation;
    private modelo;
    private pivotInsert;
    private totalShapeZone;
    private optimalDistance;
    constructor(pS2: number[][]);
    makeFirstPopulaton(pS1: number[], pZone: number): void;
    private generatePopulation;
    clear(): void;
    private getDistanceNewPopulation;
    private fitness;
    private reproduction;
    private insertKid;
    private mutation;
    getNewPopulation(): number[][];
}
