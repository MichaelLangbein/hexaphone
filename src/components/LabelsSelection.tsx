import React from 'react';
import { IonItem, IonLabel, IonList, IonListHeader, IonRadioGroup, IonRadio } from '@ionic/react';
import { KeyLabels } from '../hexaphone/helpers/music';


export const LabelsSelection: React.FC<{labels: KeyLabels, onLabelsSelected: (l: KeyLabels) => void}> = (props) => {

    return (
        <IonList>
            <IonListHeader>
                <IonLabel>
                    Key labels
            </IonLabel>
            </IonListHeader>

            <IonRadioGroup value={props.labels}>

                <IonItem onClick={() => props.onLabelsSelected('major')}>
                    <IonLabel>
                        Major
                </IonLabel>
                    <IonRadio slot="start" value={'major'} />
                </IonItem>

                <IonItem onClick={() => props.onLabelsSelected('minor')}>
                    <IonLabel>
                        Minor
                </IonLabel>
                    <IonRadio slot="start" value={'minor'} />
                </IonItem>

                <IonItem onClick={() => props.onLabelsSelected('number')}>
                    <IonLabel>
                        Numbers
                </IonLabel>
                    <IonRadio slot="start" value={'number'} />
                </IonItem>

            </IonRadioGroup>
        </IonList>
    )
}