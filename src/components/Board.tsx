import React from 'react';
import { BoardService } from '../state/board.svc';



export class Board extends React.Component<{ boardSvc: BoardService }, {}> {

    private canvas: React.RefObject<HTMLCanvasElement>;

    constructor(props: { boardSvc: BoardService }) {
        super(props);

        this.canvas = React.createRef<HTMLCanvasElement>();

        window.addEventListener('orientationchange', () => {
            if (this.canvas.current) {
                this.props.boardSvc.setBoardSize(window.innerWidth, window.innerHeight);
            }
        });
        window.addEventListener('resize', () => {
            if (this.canvas.current) {
                this.props.boardSvc.setBoardSize(window.innerWidth, window.innerHeight);
            }
        });
    }

    componentDidMount() {
        if (this.canvas.current) {
            this.props.boardSvc.initBoard(
                this.canvas.current, window.innerWidth, window.innerHeight,
            );
            this.props.boardSvc.initSynth();  // @TODO: start this from own modal?
        }
    }

    render() {
        return <canvas ref={this.canvas}></canvas>
    }
}
