import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonModal, IonRow, IonToast } from '@ionic/react';
import React from 'react';
import { Observable, Subscription } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { BoardService } from '../state/board.svc';


export class Tutorial extends React.Component<{ boardSvc: BoardService, onClosed: () => void }, { step: number }> {

    private touches$: Observable<number[]>;
    private subscriptions: Subscription[] = [];

    constructor(props: any) {
        super(props);
        this.state = {
            step: 0
        };

        this.touches$ = this.props.boardSvc.listenToTouches();
    }

    componentWillUnmount() {
        for (const s of this.subscriptions) {
            s.unsubscribe();
        }
    }

    render() {
        return (
            <div>
                <IonModal isOpen={this.state.step === 0}>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>What is hexaphone?</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <p>Hexaphone is a musical instrument. Its keyboard has keys arranged in a pattern such that notes which sound harmonically together are also located close to each other. By the same logic hitting keys that are disharmonious is hard.</p>
                            <p>Try it out! Click on 'next' and hit any key.</p>
                        </IonCardContent>
                    </IonCard>
                    <IonButton onClick={(evt) => this.setState({ step: 1 }) }>next</IonButton>
                </IonModal>

                <IonToast
                    isOpen={ this.state.step === 1 }
                    onDidPresent={
                        () => {
                            const subscription = this.touches$.pipe(
                                filter((frequencies) => !!frequencies.length),
                                delay(1500))
                            .subscribe((frequencies) => {
                                this.setState({ step: 2 });
                            });
                            this.subscriptions.push(subscription);
                        }
                    }
                    message="Touch any key"
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
                    message="Touch another key"
                    onDidPresent={
                        () => {
                            const subscription = this.touches$.pipe(
                                filter((frequencies) => !!frequencies.length),
                                delay(1500))
                            .subscribe((frequencies) => {
                                this.setState({ step: 3 });
                            });
                            this.subscriptions.push(subscription);
                        }
                    }
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
                                this.setState({ step: 3 })
                            }
                        }
                    ]}
                />

                <IonModal isOpen={this.state.step === 3}>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Good work!</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <p  >That's it! You now know how to play the hexaphone. Happy jamming!</p>
                        </IonCardContent>

                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonButton onClick={ (evt) => this.setState({ step: 2 }) }>
                                        Back
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton onClick={(evt) => {
                                        this.setState({ step: 0 });
                                        this.props.onClosed();
                                    } }>OK</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                    </IonCard>
                </IonModal>
            </div>
        );
    }
}
