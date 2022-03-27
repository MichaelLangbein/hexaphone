import { Renderable } from "./Renderer";
import { Synthesizer } from './Synthesizer';


// https://jameshfisher.com/2018/12/29/how-to-draw-sprites-on-an-html-canvas/
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation


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

        const fontSize = 48;
        
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
    
    render(context: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }


    touched(force = 1.0, x: number, y: number, preventRetouch = false): number | void  {
        if (preventRetouch) {
            if (this.glowing > 0) return;
        }

        const tolerance = 1.1;
        const deltaX = x - this.hexagon.x;
        const deltaY = y - this.hexagon.y;
        // if point is off horizontally ...
        if (Math.abs(deltaX) > tolerance * this.hexagon.scale.x * this.hexagon.texture.width / 2) {
            return;
        }
        // if point is off vertically ...
        if (Math.abs(deltaY) > tolerance * this.hexagon.scale.y * this.hexagon.texture.height / 2) {
            return;
        }
        // if point is off diagonally ...
        const h = this.hexagon.scale.y * this.hexagon.texture.height / 2;
        const Y = h - deltaX / Math.sqrt(3);
        if (deltaY > tolerance * Y) {
            return;
        }

        this.synth.play(this.frequency, force);
    
        this.glowing = 0.5;

        return this.frequency;
    }
}