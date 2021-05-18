import { Container } from '@pixi/display';
import { Key } from './Key';
import { getFrequencyNthTone } from './helpers/music';
import { Renderable } from './Interfaces';
import { Synthesizer } from './Synthesizer';
import { getHexIndicesAround, hexCoordsToXyCoords, xyCoordsToHexCoords } from './helpers/hexIndex';

/**
 * Huge thanks to https://www.redblobgames.com/grids/hexagons/ !
 */


export class Board implements Renderable {

    private keys: {[key: string]: Key} = {};
    private container: Container;
    private scale: number;
    

    constructor(
        private synth: Synthesizer,
        labelFunction: (frequency: number, alpha: number, beta: number, gamma: number) => string,
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
        nrKeysPerRow: number, nrRows: number, scale: number) {

        this.container = new Container();
        this.scale = scale;
        this.reshape(nrKeysPerRow, nrRows, scale, labelFunction, fillColor, lineColor);
    }

    click(evt: MouseEvent): void {
        // note: this needs to be changed if there are other ui-elements, like headers, menus etc
        const x = evt.x - this.getDisplayObject().x;
        const y = evt.y - this.getDisplayObject().y;

        const coords = xyCoordsToHexCoords(this.scale, x, y);
        const hexIndex = `${coords[0]}/${coords[1]}/${coords[2]}`;
        for (const candidateHexIndex in this.keys) {
            if (candidateHexIndex === hexIndex) {
                const key = this.keys[candidateHexIndex];
                key.touched();
            }
        }
    }

    touch(touch: Touch): void {
        /**
         * touch.force: [0 .. 1], 0 if device does not support pressure
         * touch.radiusX: [css-pixels, same scale as touch.screenX]
         */

        // note: this needs to be changed if there are other ui-elements, like headers, menus etc
        const x = touch.clientX - this.getDisplayObject().x;
        const y = touch.clientY - this.getDisplayObject().y;
        const rX = touch.radiusX > 0 ? touch.radiusX : 10;
        const rY = touch.radiusY > 0 ? touch.radiusY : 10;
        const hexCoordsList = getHexIndicesAround(x, y, this.scale, rX, rY);
        for (const hexCoords of hexCoordsList) {
            for (const hexCoordsCandidate in this.keys) {
                if (hexCoordsCandidate === hexCoords) {
                    const key = this.keys[hexCoordsCandidate];
                    if (touch.force > 0) {
                        key.touched(touch.force);
                    } else {
                        key.touched();
                    }
                    break;
                }
            }
        }
    }

    getDisplayObject(): Container {
        return this.container;
    }

    update(deltaT: number) {
        for (const index in this.keys) {
            this.keys[index].update(deltaT);
        }
    }

    reshape(nrKeysPerRow: number, nrRows: number, scale: number,
        labelFunction: (frequency: number, alpha: number, beta: number, gamma: number) => string,
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number) {
        while (this.container.children[0]) {
            this.container.removeChild(this.container.children[0]);
        }
     
        const betaMin = Math.round(-nrRows / 2);
        const betaMax = Math.round(nrRows / 2);
        for (let beta = betaMin; beta < betaMax; beta++) {
            const alphaMin = Math.round(- nrKeysPerRow / 2 - beta * 0.5);
            const alphaMax = Math.round(nrKeysPerRow / 2 - beta * 0.5);
            for (let alpha = alphaMin; alpha < alphaMax; alpha++) {
                const gamma = - alpha - beta;
                const index = `${alpha}/${beta}/${gamma}`;
                const frequency = this.getFrequencyFromHexCoords(alpha, beta, gamma);
                const [xPos, yPos] = hexCoordsToXyCoords(scale, alpha, beta, gamma);
                const fc = fillColor(frequency, xPos, yPos, alpha, beta, gamma);
                const lc = lineColor(frequency, xPos, yPos, alpha, beta, gamma)
                const key = new Key(this.synth, fc, lc, xPos, yPos, scale, scale * 0.0125, frequency, labelFunction(frequency, alpha, beta, gamma));
                this.keys[index] = key;
            }
        }

        for (const key of Object.values(this.keys)) {
            this.container.addChild(key.getDisplayObject());
        }
    }

    private getFrequencyFromHexCoords(alpha: number, beta: number, gamma: number): number {
        return getFrequencyNthTone(
            440,
            3.5 * (alpha - gamma) + 0.5 * beta
        );
    }
}
