import React from 'react';
import { BoardState, defaultFillColor, defaultLineColor, initBoard } from '../hexaphone/BoardLive';
import { getKeyboardLayout } from '../hexaphone/helpers/hexIndex';
import { getNoteName, KeyLabels } from '../hexaphone/helpers/music';
import { Timbre } from '../hexaphone/Synthesizer';
import './Board.css';

export class Board extends React.Component<{labels: KeyLabels, timbre: Timbre}, {}> {
    
    private canvas: React.RefObject<HTMLCanvasElement>;
    private boardState: BoardState | null = null;

    constructor(props: {labels: KeyLabels, timbre: Timbre}) {
         super(props);
         this.canvas = React.createRef<HTMLCanvasElement>();
    }

    private initBoard(canvas: HTMLCanvasElement, props: { labels: KeyLabels; timbre: Timbre; }): BoardState {
        const keyDescription = (frequency: number) => {
            return getNoteName(frequency, props.labels);
        };
        const fillColor = defaultFillColor;
        const lineColor = defaultLineColor;

        const boardState = initBoard(canvas, canvas.clientWidth, canvas.clientHeight, keyDescription, fillColor, lineColor);
        
        boardState.synth.setTimbre(this.props.timbre);
        boardState.synth.start();

        return boardState;
    }


    private updateApp(canvas: HTMLCanvasElement, props: {labels: KeyLabels, timbre: Timbre}) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const [keysPerRow, rows, scale] = getKeyboardLayout(width, height);

        if (this.boardState) {
            const labelFunction = (frequency: number) => {
                return getNoteName(frequency, props.labels);
            };
            this.boardState.board.reshape(keysPerRow, rows, scale, labelFunction, defaultFillColor, defaultLineColor);
            this.boardState.synth.setTimbre(props.timbre);
        } else {
            this.boardState = this.initBoard(canvas, props);
        }
    }
    

    shouldComponentUpdate(newProps: {labels: KeyLabels, timbre: Timbre}) {
        if (this.canvas.current) {
            this.updateApp(this.canvas.current, newProps);
            return false;
        }
        return true;
    }

    render() {
        return (
            <canvas ref={this.canvas}></canvas>
        );
    }
}