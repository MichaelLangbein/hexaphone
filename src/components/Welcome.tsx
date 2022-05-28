import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonLabel } from '@ionic/react';

export class Welcome extends React.Component<{ onPlayClicked: () => void, onTutorialClicked: () => void }> {
    render() {
        return (
            <IonContent>
                <div style={{margin: '5%'}}>
                    <h1>Welcome to Hexaphone!</h1>
                    <h4>The ergonomic keyboard</h4>
                    <div>
                        <img alt="hexaphone logo" src="./assets/sprites/hexagonAndKey.svg" style={{
                            height: "20%",
                            width: "20%",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }} />
                        <IonItem>
                            <IonLabel color={'primary'} onClick={(evt) => this.props.onTutorialClicked()}>
                                Tutorial
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel color={'primary'} onClick={(evt) => this.props.onPlayClicked()}>
                                Play!
                            </IonLabel>
                        </IonItem>
                    </div>
                </div>
            </IonContent>
        );

    }
}