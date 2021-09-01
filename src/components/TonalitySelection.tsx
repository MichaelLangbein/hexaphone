
import React from 'react';
import { IonItem, IonLabel, IonList, IonListHeader, IonRadioGroup, IonRadio } from '@ionic/react';
import { BoardService } from '../state/board.svc';
import { tonalities, Tonality } from '../hexaphone/helpers/music';


export class TonalitySelection extends React.Component<{ boardSvc: BoardService, onTonalitySelected: () => void }, { tonality: Tonality }> {

    constructor(props: any) {
        super(props);
        this.state = {
            tonality: this.props.boardSvc.getTonality()
        };
    }

    private getTonality() {
        return this.state.tonality;
    }

    private setTonality(tonality: Tonality) {
        this.props.boardSvc.setTonality(tonality); // change board
        this.props.onTonalitySelected();           // notify parent
        this.setState({ tonality: tonality });     // update own state
    }

    render() {
        return (
            <IonList className="scroll-content">
                <IonListHeader>
                    <IonLabel>
                        Tonality
                    </IonLabel>
                </IonListHeader>

                <IonRadioGroup value={this.getTonality()}>

                    <IonItem key={-1} onClick={() => this.setTonality(null)}>
                        <IonLabel>
                            None
                        </IonLabel>
                        <IonRadio slot="start" value={null} />
                    </IonItem>

                    {tonalities.map((t, i) =>
                        <IonItem key={i} onClick={() => this.setTonality(t)}>
                            <IonLabel>
                                {t}
                            </IonLabel>
                            <IonRadio slot="start" value={t} />
                        </IonItem>
                    )}

                </IonRadioGroup>
            </IonList>
        )
    }

}