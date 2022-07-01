import { IonContent, IonList, IonListHeader, IonLabel, IonRadioGroup, IonItem, IonRadio } from "@ionic/react";
import React from "react";
import { BoardService } from "../state/board.svc";

interface OscConfigState {}

export class OscConfiguration extends React.Component<{ boardSvc: BoardService, onDone: () => void }, OscConfigState> {

    constructor(props: any) {
        super(props);
    }

    private doConnect() {
        // this.props.boardSvc.connectToOsc()
    }

    render() {
        return (
            <IonContent>
                <IonList>

                    <IonListHeader>
                        <IonLabel>
                            OSC configuration
                        </IonLabel>
                    </IonListHeader>

                    <div>
                        <label htmlFor="url">URL</label>
                        <input name="url" type="text" />
                    </div>
                    <div>
                        <label htmlFor="port">Port</label>
                        <input name="port" type="number" />
                    </div>
                    <div>
                        <label htmlFor="channel">Channel</label>
                        <input name="channel" type="text" />
                    </div>
                    <button onClick={this.doConnect}>Connect</button>

                </IonList>
            </IonContent>
        );
    }

}
