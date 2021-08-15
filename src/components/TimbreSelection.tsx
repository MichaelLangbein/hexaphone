import { IonItem, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup } from '@ionic/react';
import React from 'react';
import { Timbre } from '../hexaphone/Synthesizer';
import { BoardService } from '../state/board.svc';



export class TimbreSelection extends React.Component<{ boardSvc: BoardService, onTimbreSelected: () => void }, { timbre: Timbre }> {

    constructor(props: any) {
        super(props);
        this.state = {
            timbre: this.props.boardSvc.getTimbre()
        };
    }

    private getTimbre() {
        return this.state.timbre;
    }

    private setTimbre(timbre: Timbre) {
        this.props.boardSvc.setTimbre(timbre).subscribe((success) => {
            this.props.onTimbreSelected();
            this.setState({ timbre });
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
                        <IonRadio slot="start" value={'piano'} />
                    </IonItem>

                </IonRadioGroup>
            </IonList>
        );
    }
}
