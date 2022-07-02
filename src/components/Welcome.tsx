import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonItem, IonLabel, IonRow } from '@ionic/react';
import { Link } from 'react-router-dom';

export class Welcome extends React.Component<{ onPlayClicked: () => void, onTutorialClicked: () => void }> {
    render() {
        return (
            <IonContent>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{margin: '5%', flex: '4'}}>
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

                    <div style={{margin: '5%', flex: '1'}}>
                        <IonRow>
                            <IonCol>
                                <Link to="/privacy">
                                    <IonButton>Privacy</IonButton>
                                </Link>
                            </IonCol>
                            <IonCol>
                                <a href="https://github.com/michaellangbein/hexaphone.ionic" target="_blank">
                                    <IonButton>Github</IonButton>
                                </a>
                            </IonCol>
                        </IonRow>
                    </div>
                </div>
            </IonContent>
        );

    }
}