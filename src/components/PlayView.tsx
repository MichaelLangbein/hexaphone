import {
  IonContent, IonPage, IonFab, IonFabButton, IonIcon,
  IonFabList, IonModal
} from '@ionic/react';
import { arrowDownCircle, help, musicalNote, text } from 'ionicons/icons';
import React from 'react';
import { Ad } from './Ad';
import { Board } from './Board';
import { LabelsSelection } from './LabelsSelection';
import { TimbreSelection } from './TimbreSelection';
import { Tutorial } from './Tutorial';
import { BoardService } from '../state/board.svc';


interface PlayViewState {
  showTutorialModal: boolean;
  showLabelsModal: boolean;
  showTimbreModal: boolean;
  showStartModal: boolean;
}

const boardSvc = new BoardService();

class PlayView extends React.Component<{}, PlayViewState> {

  private boardContainer: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      showTutorialModal: false,
      showLabelsModal: false,
      showTimbreModal: false,
      showStartModal: false, 
    }
    this.boardContainer = React.createRef<HTMLDivElement>();
  }

  render() {

    return (
      <IonPage>
        <IonContent fullscreen>

          <IonModal isOpen={this.state.showTutorialModal}>
            <Tutorial></Tutorial>
          </IonModal>

          <IonModal isOpen={this.state.showTimbreModal}>
            <TimbreSelection boardSvc={boardSvc} onTimbreSelected={() => {
              this.setState({
                ...this.state,
                showTimbreModal: false
              });
            }}></TimbreSelection>
          </IonModal>

          <IonModal isOpen={this.state.showLabelsModal}>
            <LabelsSelection boardSvc={boardSvc} onLabelsSelected={() => {
              this.setState({
                ...this.state,
                showLabelsModal: false
              });
            }}></LabelsSelection>
          </IonModal>

          <Board boardSvc={boardSvc}></Board>

          <IonFab vertical="top" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={arrowDownCircle} />
            </IonFabButton>
            <IonFabList>
              <IonFabButton color="medium" onClick={() => this.setState((oldState, props) => ({ ...oldState, showTimbreModal: true }))}>
                <IonIcon icon={musicalNote}></IonIcon>
              </IonFabButton>
              <IonFabButton color="medium" onClick={() => this.setState((oldState, props) => ({ ...oldState, showLabelsModal: true }))}>
                <IonIcon icon={text}></IonIcon>
              </IonFabButton>
              <IonFabButton color="medium">
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
