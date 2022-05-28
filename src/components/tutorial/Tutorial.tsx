import React from 'react';
import { Observable, Subscription } from 'rxjs';
import { delay, distinct, filter, first, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { getNthToneFromFrequency, isMajorChord, isMinorChord } from '../../hexaphone/helpers/music';
import { flattenArraysAndGetUniqueTail, getLastNUniqueNotes, movingWindow } from '../../hexaphone/helpers/rxjs';
import { BoardService } from '../../state/board.svc';
import TutorialCard from './TutorialCard';
import TutorialToast from './TutorialToast';


export class Tutorial extends React.Component<{ boardSvc: BoardService, onClosed: () => void }, { step: number }> {

    private touches$: Observable<number[]>;

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
                    open={ this.state.step === 0 }
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
                    open={ this.state.step === 1 }
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
                    open={ this.state.step === 2 }
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
                    <p>Notes that sound harmonious together are close to each other.</p>
                    <p>A major chord consists of three notes: the root, the major third, and the fifth.</p>
                    <p>In hexaphone's keyboard-layout, this corresponds to hitting three keys that form an upward-pointing triangle.</p>
                    <img src="assets/tutorial/major_chord.gif" alt="major chord" style={{width: '30vh'}} />
                    <p>Try it out!</p>
                </TutorialCard>

                <TutorialToast
                    open={this.state.step === 4}
                    message='Play a major chord'
                    onDidPresent={() => {
                        this.touches$.pipe(
                            getLastNUniqueNotes(3),
                            tap(fs => console.log(fs.map((f: number) => getNthToneFromFrequency(440, f)))),
                            filter((frequencies: number[]) => isMajorChord(frequencies as [number, number, number])),
                            first()
                        ).subscribe(() => this.stateFwd() );
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
                    <p>Try it out!</p>
                </TutorialCard>

                <TutorialToast
                    open={this.state.step === 6}
                    message='Play a minor chord'
                    onDidPresent={() => {
                        this.touches$.pipe(
                            getLastNUniqueNotes(3),
                            tap(fs => console.log(fs.map((f: number) => getNthToneFromFrequency(440, f)))),
                            filter((frequencies: number[]) => isMinorChord(frequencies as [number, number, number])),
                            first()
                        ).subscribe(() => this.stateFwd() );
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
                    <p>That's it! You now know how to play the hexaphone. Happy jamming!</p>
                </TutorialCard>

            </div>
        );
    }
}
