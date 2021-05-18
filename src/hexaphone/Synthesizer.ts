import { Compressor, Frequency, Limiter, PolySynth, Sampler, start, Synth, ToneAudioBuffer, ToneAudioNode, Transport } from "tone";



export type Timbre = 'basic' | 'piano';


export class Synthesizer {

    private globalOutput: ToneAudioNode;
    private polySynth: PolySynth;
    private piano: Sampler;
    private timbre: Timbre = 'basic';

    constructor() {
        this.globalOutput = new Compressor(0).toDestination();
        this.polySynth = new PolySynth(Synth).connect(this.globalOutput);

        this.piano = new Sampler({
            urls: this.getFileNames(),
            baseUrl: 'assets/samples/piano/',
            onload: () =>  console.log('piano samples loaded'),
        }).connect(this.globalOutput);
    }

    start() {
        start();
    }

    play(frequency: number, force: number) {
        switch (this.timbre) {
            case 'piano':
                this.piano.triggerAttackRelease(frequency, 0.5);
                break;
            case 'basic':
            default:
                this.polySynth.triggerAttackRelease(frequency, 0.5);
                break;
        }
    }

    setTimbre(timbre: Timbre) {
        this.timbre = timbre;
    }

    private getFileNames() {
        const fileNames: {[key: string]: string} = {};
        const names = Object.keys(pianoNoteNames);
        for (let i = 0; i < names.length; i++) {
            if (i % 12 == 0) {
                const name = names[i];
                fileNames[name] = pianoNoteNames[name];
                // fileNames[name] = new ToneAudioBuffer({
                //     url: 'assets/samples/piano/' + pianoNoteNames[name],
                //     onerror: (err: Error) => console.log('Some error ...')
                // });
            }
        }
        return fileNames;
    }
}


const pianoNoteNames: {[key: string]: string} = {
    'A0': 'A0.ogg',
    'A2': 'A2.ogg',
    'A3': 'A3.ogg',
    'A4': 'A4.ogg',
    'A5': 'A5.ogg',
    'A6': 'A6.ogg',
    'A#0': 'As0.ogg',
    'A#1': 'As1.ogg',
    'A#2': 'As2.ogg',
    'A#3': 'As3.ogg',
    'A#4': 'As4.ogg',
    'A#5': 'As5.ogg',
    'A#6': 'As6.ogg',
    'B0': 'B0.ogg',
    'B1': 'B1.ogg',
    'B2': 'B2.ogg',
    'B3': 'B3.ogg',
    'B4': 'B4.ogg',
    'B5': 'B5.ogg',
    'B6': 'B6.ogg',
    'C0': 'C0.ogg',
    'C1': 'C1.ogg',
    'C2': 'C2.ogg',
    'C3': 'C3.ogg',
    'C4': 'C4.ogg',
    'C5': 'C5.ogg',
    'C6': 'C6.ogg',
    'C7': 'C7.ogg',
    'C#0': 'Cs0.ogg',
    'C#1': 'Cs1.ogg',
    'C#2': 'Cs2.ogg',
    'C#3': 'Cs3.ogg',
    'C#4': 'Cs4.ogg',
    'C#5': 'Cs5.ogg',
    'C#6': 'Cs6.ogg',
    'D0': 'D0.ogg',
    'D1': 'D1.ogg',
    'D2': 'D2.ogg',
    'D3': 'D3.ogg',
    'D4': 'D4.ogg',
    'D5': 'D5.ogg',
    'D6': 'D6.ogg',
    'D#0': 'Ds0.ogg',
    'D#1': 'Ds1.ogg',
    'D#2': 'Ds2.ogg',
    'D#3': 'Ds3.ogg',
    'D#4': 'Ds4.ogg',
    'D#5': 'Ds5.ogg',
    'D#6': 'Ds6.ogg',
    'E0': 'E0.ogg',
    'E1': 'E1.ogg',
    'E2': 'E2.ogg',
    'E3': 'E3.ogg',
    'E4': 'E4.ogg',
    'E5': 'E5.ogg',
    'E6': 'E6.ogg',
    'F0': 'F0.ogg',
    'F1': 'F1.ogg',
    'F2': 'F2.ogg',
    'F3': 'F3.ogg',
    'F4': 'F4.ogg',
    'F5': 'F5.ogg',
    'F6': 'F6.ogg',
    'F#0': 'Fs0.ogg',
    'F#1': 'Fs1.ogg',
    'F#2': 'Fs2.ogg',
    'F#3': 'Fs3.ogg',
    'F#4': 'Fs4.ogg',
    'F#5': 'Fs5.ogg',
    'F#6': 'Fs6.ogg',
    'G0': 'G0.ogg',
    'G1': 'G1.ogg',
    'G2': 'G2.ogg',
    'G3': 'G3.ogg',
    'G4': 'G4.ogg',
    'G5': 'G5.ogg',
    'G6': 'G6.ogg',
    'G#0': 'Gs0.ogg',
    'G#1': 'Gs1.ogg',
    'G#2': 'Gs2.ogg',
    'G#3': 'Gs3.ogg',
    'G#4': 'Gs4.ogg',
    'G#5': 'Gs5.ogg',
    'G#6': 'Gs6.ogg'
};