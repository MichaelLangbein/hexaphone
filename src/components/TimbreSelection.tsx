import { IonItem, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup, IonSpinner } from '@ionic/react';
import React from 'react';
import { tap } from 'rxjs/operators';
import { Timbre } from '../hexaphone/Synthesizer';
import { BoardService } from '../state/board.svc';



export class TimbreSelection extends React.Component<{ boardSvc: BoardService, onTimbreSelected: () => void }, { loading: boolean, timbre: Timbre }> {

    constructor(props: any) {
        super(props);
        this.state = {
            timbre: this.props.boardSvc.getTimbre(),
            loading: false
        };
    }

    private getTimbre() {
        return this.state.timbre;
    }

    private setTimbre(timbre: Timbre) {
        this.props.boardSvc.setTimbre(timbre).subscribe((success) => {
            console.log("...timbre loaded!")
            this.props.onTimbreSelected();
            this.setState({
                loading: false,
                timbre: timbre
            });
        });
        console.log("setting timbre ...")
        this.setState({
            loading: true,
            timbre: timbre
        });
    }

    render() {
        return (
            <IonList>
                <IonListHeader>
                    <IonLabel>
                        Timbre
                </IonLabel>
                </IonListHeader>

                <IonRadioGroup value={this.getTimbre()}>

                    <IonItem onClick={() => this.setTimbre('basic')}>
                        <IonLabel>
                            Default
                        </IonLabel>
                        <IonRadio slot="start" value={'basic'} />
                    </IonItem>

                    <IonItem onClick={() => this.setTimbre('piano')}>
                        <IonLabel>
                            Piano
                        </IonLabel>
                        {this.state.loading && this.state.timbre === 'piano' && <IonSpinner name="crescent" />}
                        <IonRadio slot="start" value={'piano'} />
                    </IonItem>

                    <IonItem onClick={() => this.setTimbre('saxophone')}>
                        <IonLabel>
                            Saxophone
                        </IonLabel>
                        {this.state.loading && this.state.timbre === 'saxophone' && <IonSpinner name="crescent" />}
                        <IonRadio slot="start" value={'saxophone'} />
                    </IonItem>

                    <IonItem onClick={() => this.setTimbre('harp')}>
                        <IonLabel>
                            Harp
                        </IonLabel>
                        {this.state.loading && this.state.timbre === 'harp' && <IonSpinner name="crescent" />}
                        <IonRadio slot="start" value={'harp'} />
                    </IonItem>

                    <IonItem onClick={() => this.setTimbre('violin')}>
                        <IonLabel>
                            Violin
                        </IonLabel>
                        {this.state.loading && this.state.timbre === 'violin' && <IonSpinner name="crescent" />}
                        <IonRadio slot="start" value={'violin'} />
                    </IonItem>

                </IonRadioGroup>
            </IonList>
        );
    }
}
