import { Scale, Midi } from '@tonaljs/tonal';


export function getFrequencyNthTone(base: number, n: number): number {
    return base * Math.pow(2.0, (n / 12));
}

export function getNthToneFromFrequency(base: number, f: number): number {
    return 12 * Math.log2( f / base );
}

export type KeyLabels = 'number' | 'major' | 'minor';
export const keyLabels = ['number', 'major', 'minor'];

export function getNoteName(frequency: number, labels: KeyLabels): string {
    const midi = Midi.freqToMidi(frequency);
    let nString: string;
    if (labels === 'number') {
      nString = `${Math.round(getNthToneFromFrequency(440, frequency))}`;
    } else if (labels === 'major') {
      nString = Midi.midiToNoteName(midi, {sharps: true});
    } else {
      nString = Midi.midiToNoteName(midi, {sharps: false});
    }
    return nString;
}
