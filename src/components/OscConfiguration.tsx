import { IonContent, IonList, IonListHeader, IonLabel, IonRadioGroup, IonItem, IonRadio } from "@ionic/react";
import React from "react";
import { tonalities } from "../hexaphone/helpers/music";
import { BoardService } from "../state/board.svc";

interface OscConfigState {}

export class OscConfiguration extends React.Component<{ boardSvc: BoardService, onDone: () => void }, OscConfigState> {

    constructor(props: any) {
        super(props);
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

                </IonList>
            </IonContent>
        );
    }

}
