export declare class genetic {
    private newPopulation;
    private actualPopulation;
    private model;
    private pivotInsert;
    private totalShapeZone;
    private optimalDistance;
    constructor();
    makeFirstPopulaton(pS1: number[], pZone: number): void;
    private generatePopulation;
    setModel(pModel: number[][]): void;
    clear(): void;
    private getDistanceNewPopulation;
    private fitness;
    private reproduction;
    private insertKid;
    private mutation;
    getActualPopulation(): number[][];
}
