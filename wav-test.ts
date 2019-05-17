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
}).then(function(audioData) {
  var cont = new controller(audioData, audioData);
  var num: number = 239;//11101111
  //num = num <<(31-4);
  //num = num >>(31-4);
  num = num ^(4);
  //00001111
  //11100000
  console.log(num)
  console.log("writing...");
  WavEncoder.encode(audioData).then((buffer: any) => {
    fs.writeFileSync("./GenSong/NewSong.wav", new Buffer(buffer));
  });

});