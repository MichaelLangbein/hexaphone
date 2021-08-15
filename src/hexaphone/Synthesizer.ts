import { Compressor, Frequency, Limiter, PolySynth, Sampler,
    start, Synth, ToneAudioBuffer, ToneAudioNode, Transport } from 'tone';



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
            onerror: (err) => { throw new Error(`Could not find piano assets in 'assets/samples/piano'!`); }
        }).connect(this.globalOutput);
    }

    start() {
        start();
        console.log('Synth started');
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
            if (i % 6 === 0) {
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

// samples from http://freepats.zenvoid.org/Piano/acoustic-grand-piano.html
const pianoNoteNames: {[key: string]: string} = {
    "A3": "A3vH.wav",
    "A4": "A4vH.wav",
    "A5": "A5vH.wav",
    "A6": "A6vH.wav",
    "A7": "A7vH.wav",
    "B1": "B1vH.wav",
    "B2": "B2vH.wav",
    "B7": "B7vH.wav",
    "C1": "C1vH.wav",
    "C4": "C4vH.wav",
    "C5": "C5vH.wav",
    "C6": "C6vH.wav",
    "C7": "C7vH.wav",
    "D#2": "D#2vH.wav",
    "D#3": "D#3vH.wav",
    "D#4": "D#4vH.wav",
    "D#5": "D#5vH.wav",
    "D#6": "D#6vH.wav",
    "D#7": "D#7vH.wav",
    "F#1": "F#1vH.wav",
    "F#2": "F#2vH.wav",
    "F#4": "F#4vH.wav",
    "F#5": "F#5vH.wav",
    "F#6": "F#6vH.wav",
    "F#7": "F#7vH.wav"
};