import { constants } from "./Constants";

export class analyzer {
    private audioShape1: number[][];
    private audioShape2: number[][];
    private ascent: number[][];
    private descent: number[][];
    private terrace: number[][];
    private valley: number[][];
    private silence: number[][];

    public constructor(pAudioData1: number[], pAudioData2: number[]) {
        this.ascent = [];
        this.descent = [];
        this.terrace = [];
        this.valley = [];
        this.silence = [];
        this.audioShape2 = this.generateShape3(pAudioData2, constants.LENGTH_ZONE, true);
        this.audioShape1 = this.generateShape3(pAudioData1, Math.round((pAudioData1.length)/(this.audioShape2.length*2)), false);
    }

    /*
    Este metodo me obtiene la cantidad de cada figura que aparecen por zonas
    [Subida, Bajada, Terraza, Valle, Silencio]
    */

    private generateShape(pAudioData: number[], pLengthZone: number): number[][] {
        var result: number[][] = [];
        var audioLength: number = pAudioData.length - 1;
        var difference: number = 0;
        var inclination: number = constants.ASCENT;
        var zone: number = 0;
        var height: number = constants.TERRACE;
        var shape: number = constants.ASCENT;
        result[0] = [0, 0, 0, 0, 0];
        for (var index: number = 0; index < audioLength; index++) {
            if (pAudioData[index + 1] < 0) {
                height = constants.VALLEY;
            }
            else if (pAudioData[index + 1] == 0) {
                height = constants.SILENCE;
            }
            difference = (pAudioData[index + 1] - pAudioData[index]) * 100;
            if (difference < 0) {
                inclination = constants.DESCENT;
            }
            shape = this.getShape(Math.abs(difference), inclination, height);
            inclination = constants.ASCENT;
            height = constants.TERRACE;
            result[zone][shape] += 1;
            if ((index + 1) % pLengthZone == 0) {
                zone++;
                result[zone] = [0, 0, 0, 0, 0];
            }
        }
        return result;
    }

    /*
    Este metodo me obtiene el porcentaje de aparicion de todas las figuras en la cancion
    [Subida, Bajada, Terraza, Valle, Silencio]
    */

    private generateShape2(pAudioData: number[]): number[] {
        var result: number[] = [];
        var audioLength: number = pAudioData.length - 1;
        var num: number = 0;
        var inclination: number = 0;
        var height: number = 2;
        var total: number = 0;
        var shape: number = 0;
        result = [0, 0, 0, 0, 0];
        for (var index: number = 0; index < audioLength; index++) {
            if (pAudioData[index + 1] < 0) {
                height = 3;
            }
            else if (pAudioData[index + 1] == 0) {
                height = 4;
            }
            num = (pAudioData[index + 1] - pAudioData[index]) * 100;
            if (num < 0) {
                inclination = 1;
            }
            shape = this.getShape(Math.abs(num), inclination, height);
            inclination = 0;
            height = 2;
            result[shape] += 1;
            total++;
        }
        console.log(result);
        result = this.calculatePorcent(result, total);
        return result;
    }

    /*
    Este metodo me obtiene el porcentaje de aparicion de las figuras en zonas de la cancion
    [Subida, Bajada, Terraza, Valle, Silencio]
    */

    private generateShape3(pAudioData: number[], pLengthZone: number, pSwitch: boolean): number[][] {
        pLengthZone = pLengthZone|1;
        var result: number[][] = [];
        var audioLength: number = pAudioData.length - 1;
        var difference: number = 0;
        var inclination: number = constants.ASCENT;
        var zone: number = 0;
        var height: number = constants.TERRACE;
        var shape: number = constants.ASCENT;
        result[0] = [0, 0, 0, 0, 0, 0];
        for (var index: number = 0; index < audioLength; index+=2) {
            if (pAudioData[index + 1] < 0) {
                height = constants.VALLEY;
            }
            else if (pAudioData[index + 1] == 0) {
                height = constants.SILENCE;
            }
            difference = (pAudioData[index + 1] - pAudioData[index]) * constants.TOTAL_PORCENT;
            if (difference < 0) {
                inclination = constants.DESCENT;
            }
            shape = this.getShape(Math.abs(difference), inclination, height);
            this.addFig(shape, [pAudioData[index], pAudioData[index+1]]);
            inclination = constants.ASCENT;
            height = constants.TERRACE;
            result[zone][shape] += 1;
            if (((index + 1) % (pLengthZone) == 0) && (pSwitch || this.audioShape2.length > result.length)) {
                zone++;
                result[zone] = [0, 0, 0, 0, 0, 0];
            }
        }
        var total: number = 0;
        for (var index: number = 0; index < result.length; index++) {
            total = result[index][constants.ASCENT] + result[index][constants.DESCENT] + 
            result[index][constants.TERRACE] + result[index][constants.VALLEY] + result[index][constants.SILENCE];
            result[index] = this.calculatePorcent(result[index], total);
            result[index][constants.POS_TOTAL] = total;
        }
        return result;
    }

    private addFig(pShape: number, pPoints: number[]) {
        switch (pShape) {
            case constants.ASCENT: {
                this.ascent.push(pPoints);
                break;
            }
            case constants.DESCENT: {
                this.descent.push(pPoints);
                break;
            }
            case constants.TERRACE: {
                this.terrace.push(pPoints); 
                break;
            }
            case constants.SILENCE: {
                this.valley.push(pPoints);
                break;
            }
            default: {
                this.silence.push(pPoints);
                break;
            }
        }
    }

    private getShape(pDiference: number, pSigno: number, pHeight: number): number {
        if (pDiference < constants.PORCENT_FLAT) {
            pSigno = pHeight;
        }
        return pSigno;
    }

    private calculatePorcent(pResult: number[], pTotal: number): number[] {
        for (let index: number = 0; index < pResult.length - 1; index++) {
            pResult[index] = pResult[index] / pTotal;
        }
        return pResult;
    }

    public getAudioShape1(): number[][] {
        return this.audioShape1;
    }

    public getAudioShape2(): number[][] {
        return this.audioShape2;
    }
}