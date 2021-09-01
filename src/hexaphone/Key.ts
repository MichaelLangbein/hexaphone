import { Text } from '@pixi/text';
import { Renderable } from "./Interfaces";
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { Synthesizer } from './Synthesizer';
import { Container, Sprite, Texture } from 'pixi.js';
import { delay } from 'rxjs/operators';


const baseTexture = Texture.from('assets/sprites/hexagon.png');

export class Key implements Renderable {
    private hexagon: Sprite;
    private text: Text;
    private frequency: number;
    private synth: Synthesizer;
    private glowing = 0;
    
    constructor(
        synth: Synthesizer,
        fillColor: number, textColor: number, 
        xPos: number, yPos: number, 
        scale: number, lineThickness: number, 
        frequency: number, text: string) {

        this.synth = synth;
        this.frequency = frequency;

        const fontSize = 24;
        
        const hexagon: Sprite = new Sprite(baseTexture);
        const baseSize = hexagon.texture.height / 2;
        hexagon.anchor.set(0.5);
        hexagon.x = xPos;
        hexagon.y = yPos;
        hexagon.scale.x = scale / baseSize;
        hexagon.scale.y = scale / baseSize;
        hexagon.tint = fillColor;
        hexagon.filters = [];
        this.hexagon = hexagon;

        this.text = new Text(text, {
            fontFamily: 'Arial',
            fontSize: fontSize,
            fill: textColor
        });
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.text.cacheAsBitmap = true;

        this.hexagon.addChild(this.text);
    }

    getDisplayObject(): Container {
        return this.hexagon;
    }

    update(deltaT: number): void {
        if (this.glowing > 0) {
            this.glowing -= deltaT * 0.01;
            if (this.glowing > 0 && this.hexagon.filters && this.hexagon.filters[0]) {
                (this.hexagon.filters[0] as AdvancedBloomFilter).brightness = this.glowing * 10;
            } else {
                this.hexagon.filters = [];
            }
        }
    }

    touched(force = 1.0, x: number, y: number, preventRetouch = false): void {
        if (preventRetouch) {
            if (this.glowing > 0) return;
        }

        const deltaX = x - this.hexagon.x;
        const deltaY = y - this.hexagon.y;
        const distance = Math.sqrt(
            deltaX * deltaX + deltaY * deltaY
        );
        if (distance > this.hexagon.scale.x * this.hexagon.texture.height / 2) {
            return;
        }

        this.synth.play(this.frequency, force);
    
        this.glowing = 0.5;
        this.hexagon.filters = [new AdvancedBloomFilter({
            bloomScale: 2,
            blur: 10,
            brightness: 5,
            quality: 10,
        })];
    }
}