import {
  IonContent, IonPage, IonFab, IonFabButton, IonIcon,
  IonFabList, IonModal
} from '@ionic/react';
import { arrowDownCircle, help, musicalNote, radioOutline } from 'ionicons/icons';
import React from 'react';
import { InstrumentedBoard as Board } from './Board';
import { Welcome } from './Welcome';
import { TimbreSelection } from './TimbreSelection';
import { TonalitySelection } from './TonalitySelection';
import { Tutorial } from './tutorial/Tutorial';
import { BoardService } from '../state/board.svc';


interface PlayViewState {
  showWelcomeModal: boolean;
  showTutorialModal: boolean;
  showTimbreModal: boolean;
  showTonalityModal: boolean
}

const boardSvc = new BoardService();

class PlayView extends React.Component<{}, PlayViewState> {

  private boardContainer: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      showWelcomeModal: true,
      showTutorialModal: false,
      showTimbreModal: false,
      showTonalityModal: false
    }
    this.boardContainer = React.createRef<HTMLDivElement>();
  }

  render() {

    return (
      <IonPage>
        <IonContent fullscreen>

          <IonModal isOpen={this.state.showWelcomeModal}>
            <Welcome
              onPlayClicked={ () => this.setState({
                ...this.state,
                showWelcomeModal: false
              }) }
              onTutorialClicked={ () => this.setState({
                ...this.state,
                showWelcomeModal: false,
                showTutorialModal: true
              }) }
            ></Welcome>
          </IonModal>


          {this.state.showTutorialModal && 
            <Tutorial boardSvc={boardSvc} onClosed={() => {
              this.setState({
                ...this.state,
                showTutorialModal: false
              });
            }}></Tutorial>
          }

          <IonModal isOpen={this.state.showTimbreModal}>
            <TimbreSelection boardSvc={boardSvc} onTimbreSelected={() => {
              this.setState({
                ...this.state,
                showTimbreModal: false
              });
            }}></TimbreSelection>
          </IonModal>

          <IonModal isOpen={this.state.showTonalityModal}>
            <TonalitySelection boardSvc={boardSvc} onTonalitySelected={() => {
              this.setState({
                ...this.state,
                showTonalityModal: false
              });
            }}></TonalitySelection>
          </IonModal>

          <Board boardSvc={boardSvc}></Board>

          <IonFab vertical="top" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={arrowDownCircle} />
            </IonFabButton>
            <IonFabList>
              <IonFabButton color="medium" onClick={() => this.setState((oldState, props) => ({ ...oldState, showTimbreModal: true }))}>
                <span title="timbre"><IonIcon icon={radioOutline}></IonIcon></span>
              </IonFabButton>
              <IonFabButton color="medium" onClick={() => this.setState((oldState, props) => ({ ...oldState, showTonalityModal: true }))}>
                <span title="tonality"><IonIcon icon={musicalNote}></IonIcon></span>
              </IonFabButton>
              <IonFabButton color="medium"  onClick={() => this.setState((oldState, props) => ({ ...oldState, showTutorialModal: true }))}>
                <span title="tutorial"><IonIcon icon={help}></IonIcon></span>
              </IonFabButton>
            </IonFabList>
          </IonFab>

        </IonContent>
      </IonPage>
    );
  }
}


export default PlayView;
