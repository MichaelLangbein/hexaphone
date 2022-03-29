import { hexCoordsToXyCoords, xyCoordsToTLCoords } from "./hexIndex";
import { getFrequencyNthTone, getNoteName, getNthToneFromFrequency, isInKey, Tonality } from "./music";
import { Key } from "../Key";
import { Synthesizer } from "../Synthesizer";
import { hsl, rgb } from "d3-color";
import { darkColorHSL, lightColorHSL } from "../../shared";



export function createKeys(
    nrKeysPerRow: number, nrRows: number, scale: number,
    width: number, height: number,
    synth: Synthesizer,
    fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => string,
    lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => string,
    tonality: Tonality | null) 
: {[index: string]: Key} {

    const keys: {[index: string]: Key} = {};

    const betaMin = Math.round(-nrRows / 2);
    const betaMax = Math.round(nrRows / 2);
    for (let beta = betaMin; beta < betaMax; beta++) {
        const alphaMin = Math.round(- nrKeysPerRow / 2 - beta * 0.5);
        const alphaMax = Math.round(nrKeysPerRow / 2 - beta * 0.5);
        for (let alpha = alphaMin; alpha < alphaMax; alpha++) {
            const gamma = - alpha - beta;
            const index = `${alpha}/${beta}/${gamma}`;
            const frequency = getFrequencyFromHexCoords(alpha, beta, gamma);
            const [xPosCenter, yPosCenter] = hexCoordsToXyCoords(scale, alpha, beta, gamma);
            const [xPos, yPos] = xyCoordsToTLCoords(xPosCenter, yPosCenter, width, height);
            const fc = fillColor(frequency, xPos, yPos, alpha, beta, gamma);
            const lc = lineColor(frequency, xPos, yPos, alpha, beta, gamma);
            let scaleFactor = 1.0;
            if (tonality && !isInKey(frequency, tonality)) {
                scaleFactor = 0.7;
            }
            const label = getNoteName(frequency, tonality);
            const key = new Key(synth, fc, lc, xPos + scale * Math.cos(2 * Math.PI * 30 / 360), yPos, scale * scaleFactor, scale * 0.0125, frequency, label);
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

export const defaultLabelFunction = (frequency: number, alpha: number, beta: number, gamma: number) => {
    const baseFrequency = 440;
    const n = getNthToneFromFrequency(baseFrequency, frequency);
    return `${Math.round(n)}`;
};

export const defaultFillColorFunction = (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number): string => {
    const n = getNthToneFromFrequency(440, frequency);
    const m = n % 12;
    let d;
    if (m < 0) {
        d = 12 + m;
    } else {
        d = m;
    }
    const p = d / 12;

    const h = p * (darkColorHSL.h - lightColorHSL.h) + lightColorHSL.h;
    const s = p * (darkColorHSL.s - lightColorHSL.s) + lightColorHSL.s;
    const l = p * (darkColorHSL.l - lightColorHSL.l) + lightColorHSL.l;
    const colorString = hsl(h, s, l).formatRgb();
    return colorString;
};

export const defaultLineColorFunction = (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => {
    const rgbString = defaultFillColorFunction(frequency, x, y, alpha, beta, gamma);
    const hslColor = hsl(rgb(rgbString));
    hslColor.l = 50;
    return hslColor.formatRgb();
};