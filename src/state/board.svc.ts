import * as convert from 'color-convert';
import { Observable, Subject } from 'rxjs';
import { Renderer } from '../hexaphone/Renderer';
import { Board } from '../hexaphone/Board';
import { getNthToneFromFrequency, Tonality } from '../hexaphone/helpers/music';
import { Synthesizer, Timbre } from '../hexaphone/Synthesizer';




export const defaultLabelFunction = (frequency: number, alpha: number, beta: number, gamma: number) => {
    const baseFrequency = 440;
    const n = getNthToneFromFrequency(baseFrequency, frequency);
    return `${Math.round(n)}`;
};

export const defaultFillColor = (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => {
    const n = getNthToneFromFrequency(440, frequency);
    const m = n % 12;
    let l;
    if (m < 0) {
        l = 12 + m;
    } else {
        l = m;
    }
    const p = l / 12;


    const lightColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-light');
    const mediumColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-medium');
    const darkColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-dark');
    const lightColorHsv = convert.hex.hsv(lightColor);
    const mediumColorHsv = convert.hex.hsv(mediumColor);
    const darkColorHsv = convert.hex.hsv(darkColor);


    const h = p * (darkColorHsv[0] - lightColorHsv[0]) + lightColorHsv[0];
    const s = p * (darkColorHsv[1] - lightColorHsv[1]) + lightColorHsv[1];
    const v = p * (darkColorHsv[2] - lightColorHsv[2]) + lightColorHsv[2];
    const hex = convert.hsv.hex([h, s, v]);
    return parseInt(hex.replace(/^#/, ''), 16);;
};

export const defaultLineColor = (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => {
    const hex = defaultFillColor(frequency, x, y, alpha, beta, gamma);
    const hsv = convert.hex.hsv(hex.toString(16));
    const hex2 = convert.hsv.hex([hsv[0], hsv[1], 50]);
    return parseInt(hex2.replace(/^#/, ''), 16);
};

/**
 * ** BOARD SERVICE **
 * 
 * Our app's interface to the `Board` class.
 * 
 * This service's task is to
 *  - set the state for `Board`
 *  - expose an API with which the app may alter the `Board`'s state
 *  - connect app- and browser-events with the `Board`
 *  - connect board-events with the app (as observables)
 * 
 * The actual board-logic is implemented in the `Board` class.
 */
export class BoardService {

    /* @ts-ignore */
    private canvas: HTMLCanvasElement;
    /* @ts-ignore */
    private width: number;
    /* @ts-ignore */
    private height: number;
    /* @ts-ignore */
    private renderer: Renderer;
    /* @ts-ignore */
    private board: Board;
    /* @ts-ignore */
    private synth: Synthesizer;
    /* @ts-ignore */
    private fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number;
    /* @ts-ignore */
    private lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number;
    /** @ts-ignore */
    private tonality: Tonality;
    private touches$ = new Subject<number[]>();

    public initBoard(
        canvas: HTMLCanvasElement,
        width: number,
        height: number,
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number = defaultFillColor,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number = defaultLineColor,
        tonality: Tonality = null
    ): void {
        if (this.renderer || this.board) {
            console.error("App has already been created!");
            return;
        }

        const renderer: Renderer = new Renderer(canvas);

        const synth = new Synthesizer();

        const board = new Board(synth, width, height, fillColor, lineColor);
        renderer.addElement(board);

        const dragSampleRate = 20;
        let dragging = false;
        let dragTime: number;
        const startDragListener = (evt: any) => {
            dragging = true;
            dragTime = new Date().getTime();
        };
        const whileDraggingListener = (evt: any) => {
            if (dragging) {
                const currentTime = new Date().getTime();
                const passedTime = currentTime - dragTime;
                dragTime = currentTime;
                if (passedTime > dragSampleRate) {
                    const frequencies = board.touch(evt);
                    this.touches$.next(frequencies);
                }
            }
        };
        const endDragListener = (evt: any) => {
            dragging = false;
        };
        const clickListener = (evt: any) => {
            const frequencies = board.click(evt);
            this.touches$.next(frequencies);
        };
        canvas.addEventListener('mousedown', startDragListener);
        canvas.addEventListener('mousemove', whileDraggingListener);
        canvas.addEventListener('mouseup', endDragListener);
        canvas.addEventListener('click', clickListener);

        // on mobile
        const touchListener = (evt: any) => {
            const frequencies: number[] = [];
            for (let i = 0; i < evt.touches.length; i++) {
                const touch = evt.touches[i];
                const tFreqs = board.touch(touch);
                frequencies.push(...tFreqs);
            }
            this.touches$.next(frequencies);
            evt.preventDefault();
        };
        const dragListener = (evt: any) => {
            const frequencies: number[] = [];
            for (let i = 0; i < evt.touches.length; i++) {
                const touch = evt.touches[i];
                const tFreqs = board.touch(touch, true);
                frequencies.push(...tFreqs);
            }
            this.touches$.next(frequencies);
            evt.preventDefault();
        };
        canvas.addEventListener('touchstart', touchListener);
        canvas.addEventListener('touchmove', dragListener);

        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.renderer = renderer;
        this.board = board;
        this.synth = synth;
        this.fillColor = fillColor;
        this.lineColor = lineColor;

        renderer.loop(30);
    }

    public initSynth() {
        this.synth.start();
    }

    public setBoardSize(width: number, height: number, setCanvasSizeToo = false): void {
        if (width === this.width && height === this.height) return;
        if (setCanvasSizeToo) {
            this.canvas.width = width;
            this.canvas.height = height;
        }
        this.width = width;
        this.height = height;
        this.renderer.resize(this.width, this.height);
        this.board.buildKeys(this.width, this.height, this.fillColor, this.lineColor, this.tonality);
    }

    public loadSamplerData(timbre: Timbre): Observable<boolean> {
        return this.synth.loadSamplerData(timbre);
    }

    public getTimbre(): Timbre {
        return this.synth.getTimbre();
    }

    public setTimbre(timbre: Timbre): Observable<boolean> {
        return this.synth.setTimbre(timbre);
    }

    public getTonality(): Tonality {
        return this.tonality;
    };

    public setTonality(tonality: Tonality) {
        this.tonality = tonality;
        this.board.buildKeys(this.width, this.height, this.fillColor, this.lineColor, tonality);
    }

    public listenToTouches(): Observable<number[]> {
        return this.touches$;
    }
}


