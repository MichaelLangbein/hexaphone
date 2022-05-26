import { Scale, Midi } from '@tonaljs/tonal';


export function getFrequencyNthTone(base: number, n: number): number {
    return base * Math.pow(2.0, (n / 12));
}

export function getNthToneFromFrequency(base: number, f: number): number {
    return 12 * Math.log2(f / base);
}


export function getNoteName(frequency: number, tonality: Tonality): string {
    if (!tonality) return `${Math.round(getNthToneFromFrequency(440, frequency))}`;

    const scale = Scale.get(tonality);
    const sharps = scale.notes.join(' ').includes('#');

    const midiNr = Midi.freqToMidi(frequency);
    const midiName = Midi.midiToNoteName(midiNr, { sharps });

    return midiName;
}

export type Tonality = null |
    'C major' | 'G major' | 'D major' | 'A major' | 'E major' | 'B major' | 'F# major' | 'Db major' | 'Ab major' | 'Eb major' | 'Bb major' | 'F major' |
    'A minor' | 'E minor' | 'B minor' | 'F# minor' | 'C# minor' | 'G# minor' | 'E minor' | 'Bb minor' | 'F minor' | 'C minor' | 'G minor' | 'D minor';
export const tonalities: Tonality[] = [
    'C major', 'G major', 'D major', 'A major', 'E major', 'B major', 'F# major', 'Db major', 'Ab major', 'Eb major', 'Bb major', 'F major',
    'A minor', 'E minor', 'B minor', 'F# minor', 'C# minor', 'G# minor', 'E minor', 'Bb minor', 'F minor', 'C minor', 'G minor', 'D minor'
];


export function isInKey(frequency: number, key: Tonality): boolean {
    if (key === null) return true;

    // const sharps = key.includes('major');
    const scale = Scale.get(key);
    const sharps = scale.notes.join(' ').includes('#');

    const midiNr = Midi.freqToMidi(frequency);
    const midiName = Midi.midiToNoteName(midiNr, { sharps });
    const noteName = midiName.replace(/\d+$/, "");

    return scale.notes.includes(noteName);
}


export function isMajorChord(frequencies: [number, number, number]): boolean {
    const frequenciesSorted = frequencies.sort();
    const numbers = frequenciesSorted.map(f => Math.round(getNthToneFromFrequency(440, f)));
    const d1 = numbers[1] - numbers[0];
    const d2 = numbers[2] - numbers[1];
    const largeThird = d1 === 4;
    const smallFifth = d2 === 3;
    return largeThird && smallFifth;
}

export function isMinorChord(frequencies: [number, number, number]): boolean {
    const frequenciesSorted = frequencies.sort();
    const numbers = frequenciesSorted.map(f => Math.round(getNthToneFromFrequency(440, f)));
    const d1 = numbers[1] - numbers[0];
    const d2 = numbers[2] - numbers[1];
    const smallThird = d1 === 3;
    const largeFifth = d2 === 4;
    return smallThird && largeFifth;
}
