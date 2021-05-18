import { IonItem, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup } from '@ionic/react';
import React from 'react';
import { Timbre } from '../hexaphone/Synthesizer';


export const TimbreSelection: React.FC<{timbre: Timbre, onTimbreSelected: (t: Timbre) => void}> = (props) => {
    return (
        <IonList>
            <IonListHeader>
                <IonLabel>
                    Timbre
                </IonLabel>
            </IonListHeader>

            <IonRadioGroup value={props.timbre}>

                <IonItem onClick={() => props.onTimbreSelected('basic')}>
                    <IonLabel>
                        Default
                    </IonLabel>
                    <IonRadio slot="start" value={'basic'} />
                </IonItem>

                <IonItem onClick={() => props.onTimbreSelected('piano')}>
                    <IonLabel>
                        Piano
                    </IonLabel>
                    <IonRadio slot="start" value={'piano'} />
                </IonItem>

            </IonRadioGroup>
        </IonList>
    )
}