import { IonFabButton, IonIcon } from '@ionic/react';
import { arrowDownCircle, earOutline, help, musicalNote, radioOutline } from 'ionicons/icons';
import React from 'react';
import { Observable } from 'rxjs';
import { delay, distinct, filter, first, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { getNthToneFromFrequency, isMajorChord, isMinorChord, Tonality } from '../../hexaphone/helpers/music';
import { getLastNUniqueNotes } from '../../hexaphone/helpers/rxjs';
import { Timbre } from '../../hexaphone/Synthesizer';
import { BoardService } from '../../state/board.svc';
import TutorialCard from './TutorialCard';
import TutorialToast from './TutorialToast';


export class Tutorial extends React.Component<{ boardSvc: BoardService, onClosed: () => void }, { step: number }> {

    private touches$: Observable<number[]>;
    private tonality$: Observable<Tonality>;
    private timbre$: Observable<Timbre>;

    constructor(props: any) {
        super(props);
        this.state = {
            step: 0
        };

        this.touches$ = this.props.boardSvc.listenToTouches().pipe(
            filter((frequencies) => !!frequencies.length),
            distinct(),
            delay(1500)
        );
        this.tonality$ = this.props.boardSvc.getTonality();
        this.timbre$ = this.props.boardSvc.getTimbre();
    }

    private stateBack() {
        this.setState({ step: this.state.step - 1 });
    }

    private stateFwd() {
        this.setState({ step: this.state.step + 1 });
    }

    render() {
        return (
            <div>


                <TutorialCard
                    title='What is hexaphone?'
                    open={this.state.step === 0}
                    buttons={[{
                        label: 'next',
                        action: () => this.stateFwd()
                    }]} >
                    <p>Hexaphone is a musical instrument.
                        Its keyboard has keys arranged in a pattern such that notes which sound harmonious together
                        are also located close to each other. By the same logic hitting keys that are disharmonious is hard.</p>
                    <p>Try it out! Click on 'next' and hit any key.</p>
                </TutorialCard>

                <TutorialToast
                    open={this.state.step === 1}
                    message='Touch any key'
                    onDidPresent={() => {
                        this.touches$.pipe(first())
                            .subscribe((frequencies) => {
                                this.setState({ step: 2 });
                            });
                    }}
                    buttons={[{
                        type: 'next',
                        action: () => this.stateFwd()
                    }]}></TutorialToast>

                <TutorialToast
                    open={this.state.step === 2}
                    message="Touch another key"
                    onDidPresent={() => {
                        const subscription = this.touches$.pipe(first())
                            .subscribe((frequencies) => {
                                this.setState({ step: this.state.step + 1 });
                            });
                    }}
                    buttons={[{
                        type: 'previous',
                        action: () => this.stateBack()
                    }, {
                        type: 'next',
                        action: () => this.stateFwd()
                    }]}
                ></TutorialToast>


                <TutorialCard
                    open={this.state.step === 3}
                    title='Harmony - major chords'
                    buttons={[{
                        label: 'Back',
                        action: () => this.stateBack()
                    }, {
                        label: 'OK',
                        action: () => this.stateFwd()
                    }]}>
                    <p>Notes that sound harmonious together are located close to each other.</p>
                    <p>A major chord consists of three notes: the root, the major third, and the fifth.</p>
                    <p>In hexaphone's keyboard-layout, this corresponds to hitting three keys that form an upward-pointing triangle.</p>
                    <div style={{ display: 'flex', 'justifyContent': 'center' }}>
                        <img src="assets/tutorial/major_chord.gif" alt="major chord" style={{ width: '30vh' }} />
                    </div>
                    <p>Try it out!</p>
                </TutorialCard>

                <TutorialToast
                    open={this.state.step === 4}
                    message='Play a major chord'
                    onDidPresent={() => {
                        this.touches$.pipe(
                            getLastNUniqueNotes(3),
                            // tap(fs => console.log(fs.map((f: number) => getNthToneFromFrequency(440, f)))),
                            filter((frequencies: number[]) => isMajorChord(frequencies as [number, number, number])),
                            first()
                        ).subscribe(() => this.stateFwd());
                    }}
                    buttons={[{
                        type: 'previous',
                        action: () => this.stateBack()
                    }, {
                        type: 'next',
                        action: () => this.stateFwd()
                    }]}></TutorialToast>


                <TutorialCard
                    open={this.state.step === 5}
                    title='Harmony - minor chords'
                    buttons={[{
                        label: 'Back',
                        action: () => this.stateBack()
                    }, {
                        label: 'OK',
                        action: () => this.stateFwd()
                    }]}>
                    <p>Very good!</p>
                    <p>A minor chord consists of the root, the minor third, and the fifth.</p>
                    <p>This corresponds to hitting three keys that form a downward-pointing triangle.</p>
                    <div style={{ display: 'flex', 'justifyContent': 'center' }}>
                        <img src="assets/tutorial/minor_chord.gif" alt="minor chord" style={{ width: '30vh' }} />
                    </div>
                    <p>Try it out!</p>
                </TutorialCard>

                <TutorialToast
                    open={this.state.step === 6}
                    message='Play a minor chord'
                    onDidPresent={() => {
                        this.touches$.pipe(
                            getLastNUniqueNotes(3),
                            // tap(fs => console.log(fs.map((f: number) => getNthToneFromFrequency(440, f)))),
                            filter((frequencies: number[]) => isMinorChord(frequencies as [number, number, number])),
                            first()
                        ).subscribe(() => this.stateFwd());
                    }}
                    buttons={[{
                        type: 'previous',
                        action: () => this.stateBack()
                    }, {
                        type: 'next',
                        action: () => this.stateFwd()
                    }]}></TutorialToast>


                <TutorialCard
                    open={this.state.step === 7}
                    title='Tonality'
                    buttons={[{
                        label: 'Back',
                        action: () => this.stateBack()
                    }, {
                        label: 'OK',
                        action: () => this.stateFwd()
                    }]}>
                    <p>We have now learned how keys that are close to each other sound harmonious together. But we can go one step further than just making it easy to hit chords. We can also make it easier to hit the right chord-<b>progressions</b>.</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1 0 auto', maxWidth: '80%' }} >In the top-right of the screen you'll find the options-menu.</div>
                        <div style={{ flex: '1 0 auto' }} >
                            <IonFabButton>
                                <IonIcon icon={arrowDownCircle} />
                            </IonFabButton>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1 0 auto', maxWidth: '80%' }} >If you click/tap on it, you'll find a few sub-items, including the <b>tonality</b> settings</div>
                        <div style={{ flex: '1 0 auto' }} >
                            <IonFabButton color="medium" style={{ width: '50px', height: '50px', margin: '5px 0 5px 5px' }}>
                                <span title="tonality"><IonIcon icon={musicalNote}></IonIcon></span>
                            </IonFabButton>
                        </div>
                    </div>
                    <p>This sub-menu allows you to select a tonality (or key). Notes that are not part of that key will become <b>smaller</b>, making it harder to accidentally hit a note that is not in key.</p>
                </TutorialCard>

                <TutorialToast
                    open={this.state.step === 8}
                    message='Choose a key'
                    onDidPresent={() => {
                        const initialKey = this.props.boardSvc.getTonalitySync();
                        this.tonality$
                            .pipe(distinct(), filter(t => t !== null && t !== initialKey), delay(3000), first())
                            .subscribe(t => this.stateFwd() );
                    }}
                    buttons={[{
                        type: 'previous',
                        action: () => this.stateBack()
                    }, {
                        type: 'next',
                        action: () => this.stateFwd()
                    }]}
                ></TutorialToast>


                <TutorialCard
                    open={this.state.step === 9}
                    title='Timbre'
                    buttons={[{
                        label: 'Back',
                        action: () => this.stateBack()
                    }, {
                        label: 'OK',
                        action: () => this.stateFwd()
                    }]}>
                    <p>Via the options-menu you can also chose what your keyboard should sound like.</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1 0 auto', maxWidth: '80%' }} >Open the options-menu again ...</div>
                        <div style={{ flex: '1 0 auto' }} >
                            <IonFabButton>
                                <IonIcon icon={arrowDownCircle} />
                            </IonFabButton>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1 0 auto', maxWidth: '80%' }} >... and find the <b>timbre</b> settings.</div>
                        <div style={{ flex: '1 0 auto' }} >
                            <IonFabButton color="medium" style={{ width: '50px', height: '50px', margin: '5px 0 5px 5px' }}>
                                <span title="tonality"><IonIcon icon={earOutline}></IonIcon></span>
                            </IonFabButton>
                        </div>
                    </div>
                    <p>This sub-menu allows you to select which instrument the sound of your keyboard will imitate.</p>
                </TutorialCard>

                <TutorialToast
                    open={this.state.step === 10}
                    message='Choose a timbre'
                    onDidPresent={() => {
                        const initialTimbre = this.props.boardSvc.getTimbreSync();
                        this.timbre$.pipe(distinct(), tap(t => console.log(t)), filter(t => t !== null && t !== initialTimbre), delay(3000), first()).subscribe(t => {
                            this.stateFwd();
                        })
                    }}
                    buttons={[{
                        type: 'previous',
                        action: () => this.stateBack()
                    }, {
                        type: 'next',
                        action: () => this.stateFwd()
                    }]}
                >
                </TutorialToast>

                <TutorialCard
                    open={this.state.step === 11}
                    title='Good work!'
                    buttons={[{
                        label: 'Back',
                        action: () => this.stateBack()
                    }, {
                        label: 'OK',
                        action: () => {
                            this.setState({ step: 0 });
                            this.props.onClosed();
                        }
                    }]}>
                    <p>That's it! You now know how to play the hexaphone.</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1 0 auto', maxWidth: '80%' }} >You can always repeat this tutorial by going to the options-menu and choosing <b>tutorial</b>.</div>
                        <div style={{ flex: '1 0 auto' }} >
                            <IonFabButton color="medium" style={{ width: '50px', height: '50px', margin: '5px 0 5px 5px' }}>
                                <span title="tonality"><IonIcon icon={help}></IonIcon></span>
                            </IonFabButton>
                        </div>
                    </div>
                    <p>Happy jamming!</p>
                </TutorialCard>

            </div>
        );
    }
}
