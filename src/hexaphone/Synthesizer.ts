import { Compressor, Frequency, Limiter, PolySynth, Sampler,
    start, Synth, ToneAudioBuffer, ToneAudioNode, Transport } from 'tone';
import { Observable, of } from 'rxjs';


export type Timbre = 'basic' | 'piano';


export class Synthesizer {
    
    private globalOutput: ToneAudioNode;
    private polySynth: PolySynth;
    private samplers: {[timbre: string]: Sampler};
    private timbre: Timbre = 'basic';

    constructor() {
        this.globalOutput = new Compressor(0).toDestination();
        this.polySynth = new PolySynth(Synth).connect(this.globalOutput);
        this.samplers = {};
    }

    public start() {
        start();
        console.log('Synth started');
    }

    public loadSamplerData(timbre: Timbre): Observable<boolean> {
        if (timbre === 'basic') {
            return of(true);
        }

        if (timbre in this.samplers) {
            return of(true);
        }

        const loaded$ = new Observable<boolean>((subscriber) => {
            const samplesBaseUrl = '/assets/samples/' + timbre + '/';
            const urls = this.getFileNames(timbre);
            const sampler = new Sampler({
                urls: urls,
                baseUrl: samplesBaseUrl,
                onload: () => {
                    subscriber.next(true);
                    subscriber.complete();
                },
                onerror: (error) => subscriber.error(error)
            });
            this.samplers[timbre] = sampler;
        });
        return loaded$;
    }

    public play(frequency: number, force: number) {
        if (this.timbre === 'basic') {
            this.polySynth.triggerAttackRelease(frequency, 0.5);
        } else {
            if (!(this.timbre in this.samplers)) {
                throw Error(`Samples for timbre '${this.timbre}' have not been loaded!`);
            }
            this.samplers[this.timbre].triggerAttackRelease(frequency, 0.5);            
        }
    }

    public setTimbre(timbre: Timbre): Observable<boolean> {
        this.timbre = timbre;
        if (!(this.timbre in this.samplers)) {
            return this.loadSamplerData(timbre);
        } else {
            return of(true);
        }
    }

    public getTimbre(): Timbre {
        return this.timbre;
    }


    private getFileNames(timbre: Timbre) {
        const fileNames: {[key: string]: string} = {};
        const names = Object.keys(remotePianoNoteTames);
        for (let i = 0; i < names.length; i++) {
            if (i % 1 === 0) {
                const name = names[i];
                fileNames[name] = remotePianoNoteTames[name];
                // fileNames[name] = new ToneAudioBuffer({
                //     url: 'assets/samples/piano/' + pianoNoteNames[name],
                //     onerror: (err: Error) => console.log('Some error ...')
                // });
            }
        }
        return fileNames;
    }
}

// samples from 'https://tonejs.github.io/audio/salamander/A5.mp3' 
// http://freepats.zenvoid.org/Piano/acoustic-grand-piano.html could not be decoded properly.
const remotePianoNoteTames: {[key: string]: string} = {
    'A1': 'A1.mp3',
    'A2': 'A2.mp3',
    'A3': 'A3.mp3',
    'A4': 'A4.mp3',
    'A5': 'A5.mp3',
    'A6': 'A6.mp3',
    'A7': 'A7.mp3',
    'C1': 'C1.mp3',
    'C2': 'C2.mp3',
    'C3': 'C3.mp3',
    'C4': 'C4.mp3',
    'C5': 'C5.mp3',
    'C6': 'C6.mp3',
    'C7': 'C7.mp3',
};

