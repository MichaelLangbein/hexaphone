import { IonButton, IonCard, IonCardContent, IonCardHeader, IonHeader, IonModal, IonToast } from '@ionic/react';
import React from 'react';
import { Observable } from 'rxjs';
import { delay, filter, share, tap } from 'rxjs/operators';
import { BoardService } from '../state/board.svc';


export class Tutorial extends React.Component<{ boardSvc: BoardService, onClosed: () => void }, { step: number }> {

    private touches$: Observable<number[]>;

    constructor(props: any) {
        super(props);
        this.state = {
            step: 0
        };

        this.touches$ = this.props.boardSvc.listenToTouches();
    }


    render() {
        return (
            <div>
                <IonModal isOpen={this.state.step === 0}>
                    <IonCard>
                        <IonCardHeader>Tutorial</IonCardHeader>
                        <IonCardContent>
                            <p  >Welcome to Hexaphone!</p>
                            <h2 >What is hexaphone?</h2>
                            <p  >Hexaphone is a musical instrument. It's keyboard has keys arranged in a pattern such that notes which sound harmonically together are also located close to each other. By the same logic hitting keys that are disharmonic is hard.</p>
                            <h2 >Try it out! Click on 'next' and hit any key.</h2>
                        </IonCardContent>
                    </IonCard>
                    <IonButton onClick={(evt) => this.setState({ step: 1 }) }>next</IonButton>
                </IonModal>

                <IonToast
                    isOpen={ this.state.step === 1 }
                    onDidDismiss={() => this.props.onClosed() }
                    onDidPresent={
                        () => this.touches$.pipe(
                            filter((freqs) => !!freqs.length),
                            tap((freqs) => console.log(freqs)),
                            delay(700))
                        .subscribe((freqs) => {
                            this.setState({ step: 2 });
                        })
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
