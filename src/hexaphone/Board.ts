import { Container } from '@pixi/display';
import { Key } from './Key';
import { getFrequencyNthTone } from './helpers/music';
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
        labelFunction: (frequency: number, alpha: number, beta: number, gamma: number) => string,
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
    ) {
        this.container = new Container();
        this.buildKeys(width, height, labelFunction, fillColor, lineColor);
    }

    click(evt: MouseEvent, preventReclick = false): void {
        // note: this needs to be changed if there are other ui-elements, like headers, menus etc
        const x = evt.x - this.getDisplayObject().x;
        const y = evt.y - this.getDisplayObject().y;

        const coords = xyCoordsToHexCoords(this.scale, x, y);
        const hexIndex = `${coords[0]}/${coords[1]}/${coords[2]}`;
        for (const candidateHexIndex in this.keys) {
            if (candidateHexIndex === hexIndex) {
                const key = this.keys[candidateHexIndex];
                key.touched(1.0, preventReclick);
            }
        }
    }

    touch(touch: Touch, preventRetouch = false): void {
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
                        key.touched(touch.force, preventRetouch);
                    } else {
                        key.touched(1.0, preventRetouch);
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

    buildKeys(
        width: number, height: number,
        labelFunction: (frequency: number, alpha: number, beta: number, gamma: number) => string,
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
    ) {
        while (this.container.children[0]) {
            this.container.removeChildAt(0);
        }

        const [keysPerRow, rows, scale] = getKeyboardLayout(width, height);
        const keys = createKeys(keysPerRow, rows, scale, this.synth, labelFunction, fillColor, lineColor);
        this.keys = keys;

        for (const key of Object.values(keys)) {
            this.container.addChild(key.getDisplayObject());
        }

        this.container.x = (width / 2) + (Math.sqrt(3) * scale / 2);
        this.container.y = height / 2;
        this.scale = scale;
    }

}
