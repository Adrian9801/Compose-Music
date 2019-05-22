"use strict";
/**
 * Filename: wav-test.ts
 * Author: rnunez
 * Date: 04/10/2019
 * Description: testing wav encoder
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
// import { complex as fft } from 'fft';
var WavEncoder = __importStar(require("wav-encoder"));
// import { default as ft } from 'fourier-transform';
var WavDecoder = __importStar(require("wav-decoder"));
var controller_1 = require("./controller");
var Constants_1 = require("./Constants");
var readFile = function (filepath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filepath, function (err, buffer) {
            if (err) {
                return reject(err);
            }
            return resolve(buffer);
        });
    });
};
readFile(process.argv[2]).then(function (buffer) {
    return WavDecoder.decode(buffer);
}).then(function (audioData1) {
    readFile(process.argv[3]).then(function (buffer) {
        return WavDecoder.decode(buffer);
    }).then(function (audioData2) {
        var controlador = new controller_1.controller(audioData1, audioData2);
        audioData1.channelData[Constants_1.constants.CHANNEL1] = new Float32Array(controlador.getNewSong()[Constants_1.constants.CHANNEL1]);
        audioData1.channelData[Constants_1.constants.CHANNEL2] = new Float32Array(controlador.getNewSong()[Constants_1.constants.CHANNEL2]);
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
        WavEncoder.encode(audioData1).then(function (buffer) {
            fs.writeFileSync("./GenSong/NewSong.wav", new Buffer(buffer));
        });
    });
});
//# sourceMappingURL=wav-test.js.map