import { Compressor, Frequency, Limiter, PolySynth, Sampler,
    start, Synth, ToneAudioBuffer, ToneAudioNode, Transport } from 'tone';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


export type Timbre = 'basic' | 'piano' | 'violin' | 'saxophone' | 'harp';


export class Synthesizer {
    
    private globalOutput: ToneAudioNode;
    private polySynth: PolySynth;
    private samplers: {[timbre: string]: Sampler};
    private timbre: Timbre = 'basic';

    constructor() {
        // Compressor added before output to reduce crackling sound.
        // If v > -30db, then v' = 30db + (v - 30dB)/3
        // https://www.reddit.com/r/askscience/comments/243ucv/how_is_it_possible_to_have_negative_decibels/
        this.globalOutput = new Compressor(-30, 4).toDestination();
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
        switch (timbre) {
            case 'piano':
                const pnames = Object.keys(pianoNoteNames);
                for (const name of pnames) {
                    fileNames[name] = pianoNoteNames[name];
                }
                break;
            case 'harp':
                const hnames = Object.keys(harpNoteNames);
                for (const name of hnames) {
                    fileNames[name] = harpNoteNames[name];
                }
                break;
            case 'saxophone':
                const snames = Object.keys(saxNoteNames);
                for (const name of snames) {
                    fileNames[name] = saxNoteNames[name];
                }
                break;
            case 'violin':
                const vnames = Object.keys(violinNoteNames);
                for (const name of vnames) {
                    fileNames[name] = violinNoteNames[name];
                }
                break;
        }
        return fileNames;

        // fileNames[name] = new ToneAudioBuffer({
        //     url: 'assets/samples/piano/' + pianoNoteNames[name],
        //     onerror: (err: Error) => console.log('Some error ...')
        // });
    }
}

 
const pianoNoteNames: {[key: string]: string} = {
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

const violinNoteNames: {[key: string]: string} = {
    'A3': 'A3.ogg',
    'A4': 'A4.ogg',
    'A5': 'A5.ogg',
    'A6': 'A6.ogg',
    'C4': 'C4.ogg',
    'C5': 'C5.ogg',
    'C6': 'C6.ogg',
    'C7': 'C7.ogg',
};

const saxNoteNames: {[key: string]: string} = {
    'A3': 'A3.ogg',
    'A4': 'A4.ogg',
    'C3': 'C3.ogg',
    'C4': 'C4.ogg',
};

const harpNoteNames: {[key: string]: string} = {
    'A2': 'A2.ogg',
    'A4': 'A4.ogg',
    'A6': 'A6.ogg',
    'C3': 'C3.ogg',
    'C5': 'C5.ogg',
};
