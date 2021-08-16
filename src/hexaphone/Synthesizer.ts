import { Compressor, Frequency, Limiter, PolySynth, Sampler,
    start, Synth, ToneAudioBuffer, ToneAudioNode, Transport } from 'tone';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


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
                release: 1,
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

        if (timbre === 'basic') {
            this.polySynth.connect(this.globalOutput);
            return of(true);
        }

        if (!(this.timbre in this.samplers)) {
            return this.loadSamplerData(timbre).pipe(map((success) => {
                this.samplers[this.timbre].connect(this.globalOutput);
                return success;
            }));
        } else {
            this.samplers[this.timbre].connect(this.globalOutput);
            return of(true);
        }
    }

    public getTimbre(): Timbre {
        return this.timbre;
    }


    private getFileNames(timbre: Timbre) {
        const fileNames: {[key: string]: string} = {};
        const names = Object.keys(noteNames);
        for (let i = 0; i < names.length; i++) {
            if (i % 1 === 0) {
                const name = names[i];
                fileNames[name] = noteNames[name];
                // fileNames[name] = new ToneAudioBuffer({
                //     url: 'assets/samples/piano/' + pianoNoteNames[name],
                //     onerror: (err: Error) => console.log('Some error ...')
                // });
            }
        }
        return fileNames;
    }
}

 
const noteNames: {[key: string]: string} = {
    'A1': 'A1.ogg',
    'A2': 'A2.ogg',
    'A3': 'A3.ogg',
    'A4': 'A4.ogg',
    'A5': 'A5.ogg',
    'A6': 'A6.ogg',
    'C1': 'C1.ogg',
    'C2': 'C2.ogg',
    'C3': 'C3.ogg',
    'C4': 'C4.ogg',
    'C5': 'C5.ogg',
    'C6': 'C6.ogg',
    'C7': 'C7.ogg',
};


