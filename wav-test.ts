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
readFile("./S1/SW.wav").then((buffer) => {
  return WavDecoder.decode(buffer);
}).then(function (audioData1) {

  readFile("./S2/DragonS2.wav").then((buffer) => {
    return WavDecoder.decode(buffer);
  }).then(function (audioData2) {

    var cont = new controller(audioData1, audioData2);
    audioData2.channelData[0] = new Float32Array(cont.getNewSong()[0]);
    audioData2.channelData[1] = new Float32Array(cont.getNewSong()[1]);
    console.log("writing...");
    WavEncoder.encode(audioData2).then((buffer: any) => {
      fs.writeFileSync("./GenSong/NewSong.wav", new Buffer(buffer));
    });

 });

});