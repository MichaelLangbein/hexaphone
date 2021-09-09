import { withIonLifeCycle } from '@ionic/react';
import React from 'react';
import { BoardService } from '../state/board.svc';



export class Board extends React.Component<{ boardSvc: BoardService }> {

    private canvas: React.RefObject<HTMLCanvasElement>;

    constructor(props: { boardSvc: BoardService }) {
        super(props);

        this.canvas = React.createRef<HTMLCanvasElement>();

        const doResize = () => {
            if (this.canvas.current) {
                this.props.boardSvc.setBoardSize(window.innerWidth, window.innerHeight);
                this.props.boardSvc.initSynth();
            }
        };
        window.addEventListener('orientationchange', () => doResize());  // mobile
        window.addEventListener('resize', () => doResize());  // browser

        console.log('board constructed')
    }

    componentDidMount() {
        console.log('board did mount')
        const doOnTimeOut = () => {
            if (this.canvas.current && this.canvas.current.clientWidth) {
                this.props.boardSvc.initBoard(
                    this.canvas.current, window.innerWidth, window.innerHeight,
                );
                console.log('board initialized with width/clientWidth/windowWidth ', this.canvas.current.width, this.canvas.current.clientWidth, window.innerWidth);
            } else {
                setTimeout(doOnTimeOut, 100);
                console.log('Waiting for board ...');
            }
        };
        setTimeout(doOnTimeOut, 100);
    }

    // Fired when the component routing to is about to animate into view.
    ionViewWillEnter() {
        const w = this.canvas.current?.width;
        console.log('ionViewWillEnter: canvas.with = ', w);
    }

    // Fired when the component routing to has finished animating.
    ionViewDidEnter() {
        const w = this.canvas.current?.width;
        console.log('ionViewDidEnter: canvas.with = ', w);
    }

    // Fired when the component routing from is about to animate.
    ionViewWillLeave() {
        const w = this.canvas.current?.width;
        console.log('ionViewWillLeave: canvas.with = ', w);
    }

    // Fired when the component routing to has finished animating.
    ionViewDidLeave() {
        const w = this.canvas.current?.width;
        console.log('ionViewDidLeave: canvas.with = ', w);
    }


    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <canvas ref={this.canvas}></canvas>
            </div>

        );
    }
}


export const InstrumentedBoard = withIonLifeCycle(Board);