/**
 * Filename: wav-test.ts
 * Author: rnunez
 * Date: 04/10/2019
 * Description: testing wav encoder
 */

import * as fs from 'fs';
// import { complex as fft } from 'fft';
import * as WavEncoder from 'wav-encoder';
// import { default as ft } from 'fourier-transform';
import * as WavDecoder from 'wav-decoder';

import { controller } from './controller';
import { constants } from './Constants';

const readFile = (filepath: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve(buffer);
    });
  });
};
readFile(process.argv[2]).then((buffer) => {
  return WavDecoder.decode(buffer);
}).then(function (audioData1) {

  readFile(process.argv[3]).then((buffer) => {
    return WavDecoder.decode(buffer);
  }).then(function (audioData2) {

    var controlador = new controller(audioData1, audioData2);
    audioData1.channelData[constants.CHANNEL1] = new Float32Array(controlador.getNewSong()[constants.CHANNEL1]);
    audioData1.channelData[constants.CHANNEL2] = new Float32Array(controlador.getNewSong()[constants.CHANNEL2]);

  /*  var pFather: number = 63085;//1111011001101101
    var pMother: number = 63085;
    var mask: number = 0;
    var random: number = 9;
    pFather = pFather >> (random);1111011
    pFather = pFather << (random);

    console.log(mask = pMother >> (random));
    console.log(mask = mask << (random));
    console.log(pMother = pMother ^ mask);
    console.log(pMother | pFather);*/

    console.log("writing...");
    WavEncoder.encode(audioData1).then((buffer: any) => {
      fs.writeFileSync("./GenSong/NewSong.wav", new Buffer(buffer));
    });

  });

});