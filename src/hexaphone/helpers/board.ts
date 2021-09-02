import { hexCoordsToXyCoords } from "./hexIndex";
import { getFrequencyNthTone, getNoteName, isInKey, KeyLabels, Tonality } from "./music";
import { Key } from "../Key";
import { Synthesizer } from "../Synthesizer";



export function createKeys(
    nrKeysPerRow: number, nrRows: number, scale: number,
    synth: Synthesizer,
    fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
    lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
    tonality?: Tonality) 
: {[index: string]: Key} {

    const keys: {[index: string]: Key} = {};

    const labels: KeyLabels = tonality?.includes('minor') ? 'minor' : 'major'; // @TODO: Label based on tonality: there are major keys that use b's!
    const betaMin = Math.round(-nrRows / 2);
    const betaMax = Math.round(nrRows / 2);
    for (let beta = betaMin; beta < betaMax; beta++) {
        const alphaMin = Math.round(- nrKeysPerRow / 2 - beta * 0.5);
        const alphaMax = Math.round(nrKeysPerRow / 2 - beta * 0.5);
        for (let alpha = alphaMin; alpha < alphaMax; alpha++) {
            const gamma = - alpha - beta;
            const index = `${alpha}/${beta}/${gamma}`;
            const frequency = getFrequencyFromHexCoords(alpha, beta, gamma);
            const [xPos, yPos] = hexCoordsToXyCoords(scale, alpha, beta, gamma);
            const fc = fillColor(frequency, xPos, yPos, alpha, beta, gamma);
            const lc = lineColor(frequency, xPos, yPos, alpha, beta, gamma);
            let scaleFactor = 1.0;
            if (tonality && !isInKey(frequency, tonality)) {
                scaleFactor = 0.7;
            }
            const label = getNoteName(frequency, labels);
            const key = new Key(synth, fc, lc, xPos, yPos, scale * scaleFactor, scale * 0.0125, frequency, label);
            keys[index] = key;
        }
    }

    return keys;
}


function getFrequencyFromHexCoords(alpha: number, beta: number, gamma: number): number {
    return getFrequencyNthTone(
        440,
        3.5 * (alpha - gamma) + 0.5 * beta
    );
}