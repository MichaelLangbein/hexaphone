import { IonButton, IonModal, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, IonItem, IonLabel } from '@ionic/react';
import React from 'react';
import { BoardService } from '../state/board.svc';



export class Board extends React.Component<{ boardSvc: BoardService }, { showStartModal: boolean }> {

    private canvas: React.RefObject<HTMLCanvasElement>;

    constructor(props: { boardSvc: BoardService }) {
        super(props);
        this.state = {
            showStartModal: true
        };

        this.canvas = React.createRef<HTMLCanvasElement>();

        const doResize = () => {
            if (this.canvas.current) {
                this.props.boardSvc.setBoardSize(window.innerWidth, window.innerHeight);
                this.props.boardSvc.initSynth();
            }
        };
        window.addEventListener('orientationchange', () => doResize());  // mobile
        window.addEventListener('resize', () => doResize());  // browser
    }

    private go() {
        this.setState({
            showStartModal: false
        });
    }

    componentDidMount() {
        const doOnTimeOut = () => {
            if (this.canvas.current) {
                this.props.boardSvc.initBoard(
                    this.canvas.current, window.innerWidth, window.innerHeight,
                );
                console.log('board initialized')
            } else {
                setTimeout(doOnTimeOut, 100);
                console.log('Waiting for board ...');
            }
        };
        setTimeout(doOnTimeOut, 100);
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <IonModal isOpen={this.state.showStartModal}>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Welcome to Hexaphone!</IonCardTitle>
                            <IonCardSubtitle>The ergonomic keyboard</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <img alt="hexaphone logo" src="./assets/sprites/hexagonAndKey.svg" style={{
                                height: "30%",
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }} />
                            <IonItem>
                                <IonLabel color={'primary'} onClick={(evt) => console.error("@TODO: redirect from here to tutorial")}>
                                    Tutorial
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel color={'primary'} onClick={(evt) => this.go()}>
                                    Play!
                                </IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                </IonModal>
                <canvas ref={this.canvas}></canvas>
            </div>

        );
    }
}
