import { hsl } from 'd3-color';
import { drawHexagon, Renderable } from "./Renderer";
import { Synthesizer } from './Synthesizer';




export class Key implements Renderable {

    private glowing = 0.0;
    
    constructor(
        private synth: Synthesizer,
        private fillColor: string, 
        private textColor: string, 
        private xPos: number,
        private yPos: number,
        private radius: number,
        private lineThickness: number, 
        private frequency: number,
        private text: string) {}
    
    render(context: CanvasRenderingContext2D, force: boolean): void {
        if (this.glowing > 0 || force) {
            const fillHsl = hsl(this.fillColor);
            const newFillHsl = fillHsl.brighter(this.glowing);
            const newFillRgb = newFillHsl.formatRgb();
            drawHexagon(context, {
                center: [this.xPos, this.yPos],
                tipRadius: this.radius,
                fillColor: newFillRgb,
                strokeColor: this.textColor,
                textColor: this.textColor,
                strokeThickness: this.lineThickness,
                text: this.text,
                textFont: '10px sans-serif'
            });
            this.glowing -= 0.02;
        }
    }


    touched(force = 1.0, x: number, y: number, preventRetouch = false): number | void  {
        if (preventRetouch) {
            if (this.glowing > 0) return;
        }

        const tolerance = 1.1;
        const deltaX = x - this.xPos;
        const deltaY = y - this.yPos;
        const yRadius = this.radius;
        const xRadius = this.radius * Math.cos(2 * Math.PI * 30 / 360);
        // if point is off horizontally ...
        if (Math.abs(deltaX) > tolerance * xRadius) {
            return;
        }
        // if point is off vertically ...
        if (Math.abs(deltaY) > tolerance * yRadius) {
            return;
        }
        // if point is off diagonally ...
        const d = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (d > tolerance * xRadius) {
            return;
        }

        this.synth.play(this.frequency, force);
    
        this.glowing = 1.0;

        return this.frequency;
    }
}