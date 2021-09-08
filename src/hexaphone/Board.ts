import { Container } from '@pixi/display';
import { Key } from './Key';
import { getFrequencyNthTone, Tonality } from './helpers/music';
import { Renderable } from './Interfaces';
import { Synthesizer } from './Synthesizer';
import { getHexIndicesAround, getKeyboardLayout, hexCoordsToXyCoords, xyCoordsToHexCoords } from './helpers/hexIndex';
import { createKeys } from './helpers/board';

/**
 * Huge thanks to https://www.redblobgames.com/grids/hexagons/ !
 */


export class Board implements Renderable {

    private keys: {[key: string]: Key} = {};
    private container: Container;
    private scale: number = 1;
    

    constructor(
        private synth: Synthesizer, width: number, height: number,
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
    ) {
        this.container = new Container();
        this.buildKeys(width, height, fillColor, lineColor);
    }

    click(evt: MouseEvent, preventReclick = false): number[] {
        // note: this needs to be changed if there are other ui-elements, like headers, menus etc
        const frequencies: number[] = [];
        const x = evt.x - this.getDisplayObject().x;
        const y = evt.y - this.getDisplayObject().y;

        const coords = xyCoordsToHexCoords(this.scale, x, y);
        const hexIndex = `${coords[0]}/${coords[1]}/${coords[2]}`;
        for (const candidateHexIndex in this.keys) {
            if (candidateHexIndex === hexIndex) {
                const key = this.keys[candidateHexIndex];
                const freq = key.touched(1.0, x, y, preventReclick);
                if (freq) frequencies.push(freq);
            }
        }
        return frequencies;
    }

    touch(touch: Touch, preventRetouch = false): number[] {
        /**
         * touch.force: [0 .. 1], 0 if device does not support pressure
         * touch.radiusX: [css-pixels, same scale as touch.screenX]
         */

        // @TODO: this needs to be changed if there are other ui-elements, like headers, menus etc
        const frequencies: number[] = [];
        const x = touch.clientX - this.getDisplayObject().x;
        const y = touch.clientY - this.getDisplayObject().y;
        const rX = touch.radiusX > 0 ? touch.radiusX : 10;
        const rY = touch.radiusY > 0 ? touch.radiusY : 10;
        const hexCoordsList = getHexIndicesAround(x, y, this.scale, rX, rY);
        for (const hexCoords of hexCoordsList) {
            for (const hexCoordsCandidate in this.keys) {
                if (hexCoordsCandidate === hexCoords) {
                    const key = this.keys[hexCoordsCandidate];
                    let freq = null;
                    if (touch.force > 0) {
                        freq = key.touched(touch.force, x, y, preventRetouch);
                    } else {
                        freq = key.touched(1.0, x, y, preventRetouch);
                    }
                    if (freq) frequencies.push(freq);
                    break;
                }
            }
        }
        return frequencies;
    }

    getDisplayObject(): Container {
        return this.container;
    }

    update(deltaT: number) {
        for (const index in this.keys) {
            this.keys[index].update(deltaT);
        }
    }

    buildKeys(
        width: number, height: number,
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
        tonality?: Tonality
    ) {
        while (this.container.children[0]) {
            this.container.removeChildAt(0);
        }

        const [keysPerRow, rows, scale] = getKeyboardLayout(width, height);
        const keys = createKeys(keysPerRow, rows, scale, this.synth, fillColor, lineColor, tonality || null);
        this.keys = keys;

        for (const key of Object.values(keys)) {
            this.container.addChild(key.getDisplayObject());
        }

        this.container.x = (width / 2) + (Math.sqrt(3) * scale / 2);
        this.container.y = height / 2;
        this.scale = scale;
    }

}
