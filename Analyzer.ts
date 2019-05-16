import { constants } from "./Constants";

export class analyzer{
    private AudioShape: number[][];

    public constructor(pAudioData: number[]){
        this.AudioShape = this.generateShape3(pAudioData);
    }

    /*
    Este metodo me obtiene la cantidad de cada figura que aparecen por zonas
    [Subida, Bajada, Terraza, Valle, Silencio]
    */

    private generateShape(pAudioData: number[]): number[][]{
        var result:number[][] = [];
        var audioLength:number = pAudioData.length - 1;
        var num:number = 0;
        var inclination: number = 0;
        var pos: number = 0;
        var height: number = 2;
        var shape:number = 0;
        result[0] = [0,0,0,0,0];
        for(var index:number = 0; index < audioLength; index++){
            if(pAudioData[index+1] < 0){
                height = 3;
            }
            else if(pAudioData[index+1] == 0){
                height = 4;
            }
            num = (pAudioData[index+1]-pAudioData[index])*100;
            if(num < 0){
                inclination = 1;
            }
            shape = this.getShape(Math.abs(num), inclination, height);
            inclination = 0;
            height = 2;
            result[pos][shape] +=1;
            if((index+1) % constants.TAMGEN == 0){
                pos++;
                result[pos] = [0,0,0,0,0];
            }    
        }
        return result;
    }

    /*
    Este metodo me obtiene el porcentaje de aparicion de todas las figuras en la cancion
    [Subida, Bajada, Terraza, Valle, Silencio]
    */

    private generateShape2(pAudioData: number[]): number[]{
        var result:number[] = [];
        var audioLength:number = pAudioData.length - 1;
        var num:number = 0;
        var inclination: number = 0;
        var height: number = 2;
        var total: number = 0;
        var shape:number = 0;
        result = [0,0,0,0,0];
        for(var index:number = 0; index < audioLength; index++){
            if(pAudioData[index+1] < 0){
                height = 3;
            }
            else if(pAudioData[index+1] == 0){
                height = 4;
            }
            num = (pAudioData[index+1]-pAudioData[index])*100;
            if(num < 0){
                inclination = 1;
            }
            shape = this.getShape(Math.abs(num), inclination, height);
            inclination = 0;
            height = 2;
            result[shape] +=1; 
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

   private generateShape3(pAudioData: number[]): number[][]{
    var result:number[][] = [];
    var audioLength:number = pAudioData.length - 1;
    var num:number = 0;
    var inclination: number = 0;
    var pos: number = 0;
    var height: number = 2;
    var shape:number = 0;
    result[0] = [0,0,0,0,0];
    for(var index:number = 0; index < audioLength; index++){
        if(pAudioData[index+1] < 0){
            height = 3;
        }
        else if(pAudioData[index+1] == 0){
            height = 4;
        }
        num = (pAudioData[index+1]-pAudioData[index])*100;
        if(num < 0){
            inclination = 1;
        }
        shape = this.getShape(Math.abs(num), inclination, height);
        inclination = 0;
        height = 2;
        result[pos][shape] +=1;
        if((index+1) % constants.TAMGEN == 0){
            pos++;
            result[pos] = [0,0,0,0,0];
        }    
    }
    var total: number = 0;
    for(var index: number = 0; index < result.length; index++){
        total = result[index][0] + result[index][1] + result[index][2] + result[index][3] + result[index][4];
        result[index] = this.calculatePorcent(result[index], total);
    }
    return result;
}

    private getShape(pDiference: number, pSigno: number, pHeight: number) : number{
        if(pDiference < 0.1){
            pSigno = pHeight;
        }
        return pSigno;
    }

    private calculatePorcent(pResult: number[], pTotal: number): number[]{
        for(let index: number = 0; index < pResult.length; index++){
            pResult[index] = (pResult[index]/pTotal)*100;
        }
        return pResult;
    }

    public getAudioShape(): number[][]{
        return this.AudioShape;
    }
}