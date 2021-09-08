import { IonButton, IonHeader, IonModal, IonToast } from '@ionic/react';
import React from 'react';
import { BoardService } from '../state/board.svc';


export class Tutorial extends React.Component<{ boardSvc: BoardService, onClosed: () => void }, { step: number }> {

    constructor(props: any) {
        super(props);
        this.state = {
            step: 0
        };

        // const touches$ = this.props.boardSvc.listenToTouches();
    }


    render() {
        return (
            <div>
                <IonModal isOpen={this.state.step === 0}>
                    <IonHeader>Welcome to Hexaphone</IonHeader>
                    <IonButton onClick={(evt) => this.setState({ step: 1 }) }>next</IonButton>
                </IonModal>

                <IonToast
                    isOpen={ this.state.step === 1 }
                    onDidDismiss={() => this.props.onClosed() }
                    message="Press a key"
                    position="top"
                    buttons={[
                        {
                            text: 'next',
                            role: 'next',
                            handler: () => {
                                this.setState({ step: 2 })
                            }
                        }
                    ]}
                />

                <IonToast
                    isOpen={ this.state.step === 2 }
                    onDidDismiss={() => this.props.onClosed() }
                    message="Press another key"
                    position="top"
                    buttons={[
                        {
                            side: 'start',
                            text: 'back',
                            handler: () => {
                                this.setState({ step: 1 })
                            }
                        },
                        {
                            text: 'next',
                            role: 'next',
                            handler: () => {
                                this.props.onClosed()
                            }
                        }
                    ]}
                />
            </div>
        );
    }
}
