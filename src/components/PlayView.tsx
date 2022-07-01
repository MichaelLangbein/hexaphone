import {
  IonContent, IonPage, IonFab, IonFabButton, IonIcon,
  IonFabList, IonModal
} from '@ionic/react';
import { arrowDownCircle, earOutline, earSharp, help, musicalNote, radioOutline } from 'ionicons/icons';
import React from 'react';
import { InstrumentedBoard as Board } from './Board';
import { Welcome } from './Welcome';
import { TimbreSelection } from './TimbreSelection';
import { TonalitySelection } from './TonalitySelection';
import { Tutorial } from './tutorial/Tutorial';
import { BoardService } from '../state/board.svc';
import { OscConfiguration } from './OscConfiguration';


interface PlayViewState {
  showWelcomeModal: boolean;
  showTutorialModal: boolean;
  showTimbreModal: boolean;
  showTonalityModal: boolean;
  showOscModal: boolean;
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
      showTonalityModal: false,
      showOscModal: false
    }
    this.boardContainer = React.createRef<HTMLDivElement>();
  }

  render() {

    return (
      <IonPage>
        <IonContent fullscreen>

          {/* The welcome-modal, contrary to all others, may not be dismissed, 
              because we need the click event to start the web-audio context. */}
          <IonModal isOpen={this.state.showWelcomeModal} backdropDismiss={false}>
            <Welcome
              onPlayClicked={() => {
                boardSvc.initSynth().subscribe(s => {
                  this.setState({
                    ...this.state,
                    showWelcomeModal: false
                  })
                })
              }}
              onTutorialClicked={() => {
                boardSvc.initSynth().subscribe(s => {
                  this.setState({
                    ...this.state,
                    showWelcomeModal: false,
                    showTutorialModal: true
                  })
                })
              }}
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

          <IonModal isOpen={this.state.showOscModal}>
            <OscConfiguration boardSvc={boardSvc} onDone={() => {
              this.setState({
                ...this.state,
                showOscModal: false
              });
            }}></OscConfiguration>
          </IonModal>

          <Board boardSvc={boardSvc}></Board>

          <IonFab vertical="top" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={arrowDownCircle} />
              
            </IonFabButton>
            <IonFabList>
              <IonFabButton color="medium" onClick={() => this.setState((oldState, props) => ({ ...oldState, showTonalityModal: true }))}>
                <span title="tonality" style={{display: 'flex', alignItems: 'center'}}><IonIcon icon={musicalNote}></IonIcon></span>
              </IonFabButton>
              <IonFabButton color="medium" onClick={() => this.setState((oldState, props) => ({ ...oldState, showTimbreModal: true }))}>
                <span title="timbre" style={{display: 'flex', alignItems: 'center'}}><IonIcon icon={earOutline}></IonIcon></span>
              </IonFabButton>
              <IonFabButton color="medium"  onClick={() => this.setState((oldState, props) => ({ ...oldState, showOscModal: true }))}>
                <span title="tutorial" style={{display: 'flex', alignItems: 'center'}}><IonIcon icon={radioOutline}></IonIcon></span>
              </IonFabButton>
              <IonFabButton color="medium"  onClick={() => this.setState((oldState, props) => ({ ...oldState, showTutorialModal: true }))}>
                <span title="tutorial" style={{display: 'flex', alignItems: 'center'}}><IonIcon icon={help}></IonIcon></span>
              </IonFabButton>
            </IonFabList>
          </IonFab>

        </IonContent>
      </IonPage>
    );
  }
}


export default PlayView;
