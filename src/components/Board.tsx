import { withIonLifeCycle } from '@ionic/react';
import React from 'react';
import { BoardState, defaultFillColor, defaultLineColor, initBoard } from '../hexaphone/BoardLive';
import { getKeyboardLayout } from '../hexaphone/helpers/hexIndex';
import { getNoteName, KeyLabels } from '../hexaphone/helpers/music';
import { Timbre } from '../hexaphone/Synthesizer';


export class Board extends React.Component<{ labels: KeyLabels, timbre: Timbre }, {}> {

    private canvas: React.RefObject<HTMLCanvasElement>;
    private boardState: BoardState | null = null;

    constructor(props: { labels: KeyLabels, timbre: Timbre }) {
        super(props);
        this.canvas = React.createRef<HTMLCanvasElement>();

        window.addEventListener('orientationchange', () => {
            if (this.canvas.current) {
                this.updateApp(this.canvas.current, this.props);
            }
        });
        window.addEventListener('resize', () => {
            if (this.canvas.current) {
                this.updateApp(this.canvas.current, this.props);
            }
        });
    }

    componentDidMount() {
        if (this.canvas.current) {
            this.boardState = this.initBoard(this.canvas.current, this.props);
        }
    }

    ionViewDidEnter() {
        if (this.canvas.current) {
            this.boardState = this.initBoard(this.canvas.current, this.props);
        }
    }

    private initBoard(canvas: HTMLCanvasElement, props: { labels: KeyLabels; timbre: Timbre; }): BoardState {
        const keyDescription = (frequency: number) => {
            return getNoteName(frequency, props.labels);
        };
        const fillColor = defaultFillColor;
        const lineColor = defaultLineColor;

        const boardState = initBoard(canvas, window.innerWidth * 0.95, window.innerHeight * 0.92, keyDescription, fillColor, lineColor);

        boardState.synth.setTimbre(this.props.timbre);
        boardState.synth.start();

        return boardState;
    }

    private updateApp(canvas: HTMLCanvasElement, props: { labels: KeyLabels, timbre: Timbre }) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (this.boardState) {
            this.boardState.app.renderer.resize(width, height);
            const labelFunction = (frequency: number) => {
                return getNoteName(frequency, props.labels);
            };
            this.boardState.board.buildKeys(width, height, labelFunction, this.boardState.fillColor, this.boardState.lineColor);
            this.boardState.synth.setTimbre(props.timbre);
        } else {
            this.boardState = this.initBoard(canvas, props);
        }
    }

    shouldComponentUpdate(newProps: { labels: KeyLabels, timbre: Timbre }) {
        if (this.canvas.current) {
            this.updateApp(this.canvas.current, newProps);
            return false;
        }
        return true;
    }

    render() {
        return (
            <canvas ref={this.canvas} style={{ width: '100%', height: '100%' }}></canvas>
        );
    }
}


export default withIonLifeCycle(Board);