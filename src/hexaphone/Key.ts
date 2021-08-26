import { Graphics } from '@pixi/graphics';
import { Text } from '@pixi/text';
import { Renderable } from "./Interfaces";
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { Synthesizer } from './Synthesizer';


export class Key implements Renderable {
    private hexagon: Graphics;
    private text: Text;
    private frequency: number;
    private synth: Synthesizer;
    private glowing = 0;
    
    constructor(
        synth: Synthesizer,
        fillColor: number, outlineColor: number, 
        xPos: number, yPos: number, 
        scale: number, lineThickness: number, 
        frequency: number, text: string) {

        this.synth = synth;
        this.frequency = frequency;

        const baseSize = 100;
        const fontSize = 24;

        const hexagonPath = [
            baseSize * 0,                 baseSize *  1,
            baseSize *  Math.sqrt(3) / 2, baseSize *  1/2,
            baseSize *  Math.sqrt(3) / 2, baseSize * -1/2,
            baseSize * 0,                 baseSize * -1,
            baseSize * -Math.sqrt(3) / 2, baseSize * -1/2,
            baseSize * -Math.sqrt(3) / 2, baseSize *  1/2
        ];
        const hexagon = new Graphics();
        hexagon.beginFill(fillColor, 0.8);
        hexagon.lineStyle(lineThickness, outlineColor, 0.9);
        hexagon.drawPolygon(hexagonPath);
        hexagon.endFill();
        hexagon.x = xPos;
        hexagon.y = yPos;
        hexagon.scale.x = scale / baseSize;
        hexagon.scale.y = scale / baseSize;
        this.hexagon = hexagon;

        this.text = new Text(text, {
            fontFamily: 'Arial',
            fontSize: fontSize,
            // fill: outlineColor
        });
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;

        this.hexagon.addChild(this.text);
    }

    getDisplayObject(): Graphics {
        return this.hexagon;
    }

    update(deltaT: number): void {
        if (this.glowing > 0) {
            this.glowing -= deltaT * 0.01;
            if (this.glowing > 0) {
                (this.hexagon.filters[0] as AdvancedBloomFilter).brightness = this.glowing * 10;
            } else {
                this.hexagon.filters = [];
            }
        }
    }

    touched(force = 1.0, preventRetouch = false): void {
        if (preventRetouch) {
            if (this.glowing > 0) return;
        }
        this.synth.play(this.frequency, force);
    
        this.glowing = 0.5;
        this.hexagon.filters = [new AdvancedBloomFilter({
            bloomScale: 2,
            blur: 10,
            brightness: 5,
            quality: 100,
        })];
    }
}