import React from 'react';
import { IonItem, IonLabel, IonList, IonListHeader, IonRadioGroup, IonRadio } from '@ionic/react';
import { KeyLabels } from '../hexaphone/helpers/music';
import { BoardService } from '../state/board.svc';


export class LabelsSelection extends React.Component<{ boardSvc: BoardService, onLabelsSelected: () => void }, { labels: KeyLabels }> {

    constructor(props: any) {
        super(props);
        this.state = {
            labels: this.props.boardSvc.getLabels()
        };
    }

    private getLabels() {
        return this.state.labels;
    }

    private setLabels(labels: KeyLabels) {
        this.props.boardSvc.setLabels(labels); // change board
        this.props.onLabelsSelected();  // notify parent
        this.setState({ labels });  // update own state
    }

    render() {
        return (
            <IonList>
                <IonListHeader>
                    <IonLabel>
                        Key labels
                </IonLabel>
                </IonListHeader>
    
                <IonRadioGroup value={this.getLabels() }>
    
                    <IonItem onClick={() => this.setLabels('major')}>
                        <IonLabel>
                            Major
                    </IonLabel>
                        <IonRadio slot="start" value={'major'} />
                    </IonItem>
    
                    <IonItem onClick={() => this.setLabels('minor')}>
                        <IonLabel>
                            Minor
                    </IonLabel>
                        <IonRadio slot="start" value={'minor'} />
                    </IonItem>
    
                    <IonItem onClick={() => this.setLabels('number')}>
                        <IonLabel>
                            Numbers
                    </IonLabel>
                        <IonRadio slot="start" value={'number'} />
                    </IonItem>
    
                </IonRadioGroup>
            </IonList>
        )
    }

}
