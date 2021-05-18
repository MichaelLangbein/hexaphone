import { Application } from '@pixi/app';
import { Renderer } from '@pixi/core';
import { BatchRenderer } from '@pixi/core';
import { TickerPlugin } from '@pixi/ticker';
import * as convert from 'color-convert';

import { Board } from './Board';
import { getKeyboardLayout } from './helpers/hexIndex';
import { getNthToneFromFrequency } from './helpers/music';
import { Synthesizer } from './Synthesizer';

Renderer.registerPlugin('batch', BatchRenderer);
Application.registerPlugin(TickerPlugin);



export interface BoardState {
    app: Application;
    board: Board;
    synth: Synthesizer;
    keyDescription: (frequency: number, alpha: number, beta: number, gamma: number) => string;
    fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number;
    lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number;
    clickListener: (evt: any) => void;
    touchListener: (evt: any) => void;
    tickerListener: (deltaT: number) => void;
}


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

    const hMin = 90;
    const hMax = 180;
    const h = p * (hMax - hMin) + hMin;
    const hex = convert.hsv.hex([h, 80, 80]);
    return parseInt(hex.replace(/^#/, ''), 16);;
};


export const defaultLineColor = (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => {
    const hex = defaultFillColor(frequency, x, y, alpha, beta, gamma);
    const hsv = convert.hex.hsv(hex.toString(16));
    const hex2 = convert.hsv.hex([hsv[0], 50, 50]);
    return parseInt(hex2.replace(/^#/, ''), 16);
};



export function initBoard(
        canvas: HTMLCanvasElement, width: number, height: number,
        keyDescription: (frequency: number, alpha: number, beta: number, gamma: number) => string,
        fillColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number,
        lineColor: (frequency: number, x: number, y: number, alpha: number, beta: number, gamma: number) => number
    ): BoardState {
    const app: Application = new Application({
        view: canvas,
        width, height,
        backgroundAlpha: 0
    });

    const [keysPerRow, rows, scale] = getKeyboardLayout(width, height);
    const synth = new Synthesizer();
    const board = new Board(synth, keyDescription, fillColor, lineColor, keysPerRow, rows, scale);
    board.getDisplayObject().x = (width / 2) + (Math.sqrt(3) * scale / 2);
    board.getDisplayObject().y = height / 2;
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

    const tickerListener = (deltaT: number) => {
        board.update(deltaT);
    };
    app.ticker.add(tickerListener);

    return { app, board, synth, keyDescription, fillColor, lineColor, clickListener, touchListener, tickerListener };
}


