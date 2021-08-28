import { Application } from '@pixi/app';
import { Renderer } from '@pixi/core';
import { BatchRenderer } from '@pixi/core';
import { TickerPlugin } from '@pixi/ticker';
import * as convert from 'color-convert';
import { Observable } from 'rxjs';

import { Board } from '../hexaphone/Board';
import { getNoteName, getNthToneFromFrequency, KeyLabels } from '../hexaphone/helpers/music';
import { Synthesizer, Timbre } from '../hexaphone/Synthesizer';

Renderer.registerPlugin('batch', BatchRenderer);
// Application.registerPlugin(TickerPlugin);



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


export class BoardService {

    /* @ts-ignore */
    private canvas: HTMLCanvasElement;
    /* @ts-ignore */
    private width: number;
    /* @ts-ignore */
    private height: number;
    /* @ts-ignore */
    private app: Application;
    /* @ts-ignore */
    private board: Board;
    /* @ts-ignore */
    private synth: Synthesizer;
    /* @ts-ignore */
    private labels: KeyLabels;
    /* @ts-ignore */
    private fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number;
    /* @ts-ignore */
    private lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number;
    /* @ts-ignore */
    private clickListener: (evt: any) => void;
    /* @ts-ignore */
    private touchListener: (evt: any) => void;
    /* @ts-ignore */
    dragListener: (evt: any) => void;
    /* @ts-ignore */
    private tickerListener: (deltaT: number) => void;


    public initBoard(
        canvas: HTMLCanvasElement, width: number, height: number, labels: KeyLabels = 'major',
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number = defaultFillColor,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number = defaultLineColor
    ): void {
        if (this.app || this.board) {
            console.error("App has already been created!");
            return;
        }

        const app: Application = new Application({
            view: canvas,
            width, height,
            backgroundAlpha: 0,
            antialias: false,
            powerPreference: 'high-performance',
            // autoStart: true
        });

        const synth = new Synthesizer();

        const keyFunction = this.createKeyFunction(labels);

        const board = new Board(synth, width, height, keyFunction, fillColor, lineColor);
        app.stage.addChild(board.getDisplayObject());

        // on desktop
        const clickListener = (evt: any) => {
            board.click(evt);
        };
        canvas.addEventListener('click', clickListener);

        // on mobile
        const touchListener = (evt: any) => {
            for (let i = 0; i < evt.touches.length; i++) {
                const touch = evt.touches[i];
                board.touch(touch);
            }
            evt.preventDefault();
        };
        canvas.addEventListener('touchstart', touchListener);

        const dragListener = (evt: any) => {
            for (let i = 0; i < evt.touches.length; i++) {
                const touch = evt.touches[i];
                board.touch(touch, true);
            }
            evt.preventDefault();
        };
        canvas.addEventListener('touchmove', dragListener);


        const tickerListener = (deltaT: number) => {
            board.update(deltaT);
        };
        app.ticker.add(tickerListener);

        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.app = app;
        this.board = board;
        this.synth = synth;
        this.labels = labels;
        this.fillColor = fillColor;
        this.lineColor = lineColor;
        this.clickListener = clickListener;
        this.touchListener = touchListener;
        this.dragListener = dragListener;
        this.tickerListener = tickerListener;
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
        this.app.renderer.resize(this.width, this.height);
        const keyFunction = this.createKeyFunction(this.labels);
        this.board.buildKeys(this.width, this.height, keyFunction, this.fillColor, this.lineColor);
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

    public getLabels(): KeyLabels {
        return this.labels;
    }

    public setLabels(labels: KeyLabels) {
        this.labels = labels;
        const keyFunction = this.createKeyFunction(labels);
        this.board.buildKeys(this.width, this.height, keyFunction, this.fillColor, this.lineColor);
    }

    private createKeyFunction(labels: KeyLabels) {
        if (labels === 'number') {
            return defaultLabelFunction;
        } else {
            return (freqency: number) => getNoteName(freqency, labels);
        }
    }

}


