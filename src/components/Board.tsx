import React from 'react';
import { defaultFillColor, defaultLineColor, newBoard } from '../hexaphone/BoardLive';
import { getNoteName, KeyLabels } from '../hexaphone/helpers/music';
import { Timbre } from '../hexaphone/Synthesizer';


export class Board extends React.Component<{labels: KeyLabels, timbre: Timbre}, {}> {

    constructor(props: {labels: KeyLabels, timbre: Timbre}) {
         super(props);
    }

    private start(canvas: HTMLCanvasElement | null) {
        if (canvas) {

            const keyDescription = (frequency: number) => {
                return getNoteName(frequency, this.props.labels);
            };
            const fillColor = defaultFillColor;
            const lineColor = defaultLineColor;

            const boardData = newBoard(canvas, 600, 400, keyDescription, fillColor, lineColor);
            boardData.synth.setTimbre(this.props.timbre);
            boardData.synth.start();
        }
    }

    render() {
        return (
            <canvas ref={(c: HTMLCanvasElement | null) => this.start(c)}></canvas>
        );
    }
}