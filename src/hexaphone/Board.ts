import { Key } from './Key';
import { Tonality } from './helpers/music';
import { Renderable } from './Renderer';
import { Synthesizer } from './Synthesizer';
import { getHexIndicesAround, getKeyboardLayout, tlCoordsToXyCoords, xyCoordsToHexCoords } from './helpers/hexIndex';
import { createKeys } from './helpers/board';

/**
 * Huge thanks to https://www.redblobgames.com/grids/hexagons/ !
 */


export class Board implements Renderable {

    private keys: {[key: string]: Key} = {};
    private scale: number = 1;
    private redraw = true;

    constructor(
        private synth: Synthesizer, private width: number, private height: number,
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => string,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => string,
    ) {
        this.buildKeys(width, height, fillColor, lineColor);
    }

    render(context: CanvasRenderingContext2D): void {
        if (this.redraw) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
        for (const keyName in this.keys) {
            const key = this.keys[keyName];
            key.render(context, this.redraw);
        }
        this.redraw = false;
    }

    click(evt: MouseEvent, preventReClick = false): number[] {
        // note: this needs to be changed if there are other ui-elements, like headers, menus etc
        const frequencies: number[] = [];
        const xTl = evt.x;
        const yTl = evt.y;
        const [x, y] = tlCoordsToXyCoords(xTl, yTl, this.width, this.height);
        const coords = xyCoordsToHexCoords(this.scale, x, y);
        const hexIndex = `${coords[0]}/${coords[1]}/${coords[2]}`;
        const key = this.keys[hexIndex];
        const freq = key.touched(1.0, xTl, yTl, preventReClick);
        if (freq) frequencies.push(freq);
        return frequencies;
    }

    touch(touch: Touch, preventRetouch = false): number[] {
        /**
         * touch.force: [0 .. 1], 0 if device does not support pressure
         * touch.radiusX: [css-pixels, same scale as touch.screenX]
         */

        // @TODO: this needs to be changed if there are other ui-elements, like headers, menus etc
        const frequencies: number[] = [];
        const xTl = touch.clientX;
        const yTl = touch.clientY;
        const rX = touch.radiusX > 0 ? touch.radiusX : 10;
        const rY = touch.radiusY > 0 ? touch.radiusY : 10;
        const [xc, yc] = tlCoordsToXyCoords(xTl, yTl, this.width, this.height);
        const hexCoordsList = getHexIndicesAround(xc, yc, this.scale, rX, rY);
        for (const hexCoords of hexCoordsList) {
            for (const hexCoordsCandidate in this.keys) {
                if (hexCoordsCandidate === hexCoords) {
                    const key = this.keys[hexCoordsCandidate];
                    let freq = null;
                    if (touch.force > 0) {
                        freq = key.touched(touch.force, xTl, yTl, preventRetouch);
                    } else {
                        freq = key.touched(1.0, xTl, yTl, preventRetouch);
                    }
                    if (freq) frequencies.push(freq);
                    break;
                }
            }
        }
        return frequencies;
    }

    buildKeys(
        width: number, height: number,
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => string,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => string,
        tonality?: Tonality
    ) {
        this.width = width;
        this.height = height;
        const [keysPerRow, rows, scale] = getKeyboardLayout(width, height);
        const keys = createKeys(keysPerRow, rows, scale, width, height, this.synth, fillColor, lineColor, tonality || null);
        this.keys = keys;
        this.scale = scale;
        this.redraw = true;
    }

}
