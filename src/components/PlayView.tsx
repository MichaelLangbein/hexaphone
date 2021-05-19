import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonFab, IonFabButton, IonIcon, IonFabList, useIonModal, IonModal } from '@ionic/react';
import { arrowDownCircle, help, musicalNote, text } from 'ionicons/icons';
import React from 'react';
import { KeyLabels } from '../hexaphone/helpers/music';
import { Timbre } from '../hexaphone/Synthesizer';
import { Board } from './Board';
import { LabelsSelection } from './LabelsSelection';
import { TimbreSelection } from './TimbreSelection';
import { Tutorial } from './Tutorial';


interface BoardState {
  labels: KeyLabels;
  timbre: Timbre;
  showTutorialModal: boolean;
  showLabelsModal: boolean;
  showTimbreModal: boolean;
  showStartModal: boolean;
}


class PlayView extends React.Component<{}, BoardState> {

  constructor(props: any) {
    super(props);
    this.state = {
      labels: 'major',
      timbre: 'piano',
      showTutorialModal: false,
      showLabelsModal: false,
      showTimbreModal: false,
      showStartModal: false,
    }
  }


  render() {

    return (
      <IonPage>
        <IonContent fullscreen>

          <IonModal isOpen={this.state.showTimbreModal}>
            <TimbreSelection timbre={this.state.timbre} onTimbreSelected={(t: Timbre) => {
              this.setState((oldState, props) => ({
                ...oldState,
                timbre: t,
                showTimbreModal: false
              }));
            }}></TimbreSelection>
          </IonModal>

          <IonModal isOpen={this.state.showLabelsModal}>
            <LabelsSelection labels={this.state.labels} onLabelsSelected={(l: KeyLabels) => {
              this.setState((oldState, props) => (({
                ...oldState,
                labels: l,
                showLabelsModal: false
              })));
            }}></LabelsSelection>
          </IonModal>

          <IonModal isOpen={this.state.showLabelsModal}>
            <LabelsSelection labels={this.state.labels} onLabelsSelected={(l: KeyLabels) => {
              this.setState((oldState, props) => ({
                ...oldState,
                labels: l,
                showLabelsModal: false
              }));
            }}></LabelsSelection>
          </IonModal>


          <Board labels={this.state.labels} timbre={this.state.timbre}></Board>


          <IonFab vertical="top" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={arrowDownCircle} />
            </IonFabButton>
            <IonFabList>
              <IonFabButton color="light" onClick={() => this.setState((oldState, props) => ({ ...oldState, showTimbreModal: true }))}>
                <IonIcon icon={musicalNote}></IonIcon>
              </IonFabButton>
              <IonFabButton color="light" onClick={() => this.setState((oldState, props) => ({ ...oldState, showLabelsModal: true }))}>
                <IonIcon icon={text}></IonIcon>
              </IonFabButton>
              <IonFabButton color="light">
                <IonIcon icon={help}></IonIcon>
              </IonFabButton>
            </IonFabList>
          </IonFab>

        </IonContent>
      </IonPage>
    );
  }
}


export default PlayView;
