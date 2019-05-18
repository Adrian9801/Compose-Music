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
readFile("./S1/SW.wav").then(function (buffer) {
    return WavDecoder.decode(buffer);
}).then(function (audioData1) {
    readFile("./S2/DragonS2.wav").then(function (buffer) {
        return WavDecoder.decode(buffer);
    }).then(function (audioData2) {
        var cont = new controller_1.controller(audioData1, audioData2);
        audioData2.channelData[0] = new Float32Array(cont.getNewSong()[0]);
        audioData2.channelData[1] = new Float32Array(cont.getNewSong()[1]);
        console.log("writing...");
        WavEncoder.encode(audioData2).then(function (buffer) {
            fs.writeFileSync("./GenSong/NewSong.wav", new Buffer(buffer));
        });
    });
});
//# sourceMappingURL=wav-test.js.map