
export interface Renderable {
    render(context: CanvasRenderingContext2D): void;
}

export class Renderer {
    private context: CanvasRenderingContext2D;
    private elements: Renderable[] = [];
    private rendering: boolean = false;
    
    constructor(private canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        if (!context) {
            throw Error('Could not get a 2d-context');
        }
        this.context = context;
    }

    addElement(element: Renderable) {
        this.elements.push(element);
    }

    render() {
        for (const element of this.elements) {
            element.render(this.context);
        }
    }

    loop(fps: number) {
        this.rendering = true;
        const mspf = 1000 * 1.0 / fps;

        const doLoop = () => {
            if (!this.rendering) return;
            const startTime = new Date().getTime();
            this.render();
            const endTime = new Date().getTime();
            const timePassed = endTime - startTime;
            const timeLeft = mspf - timePassed;
            if (timeLeft < 0) console.log(`rendering took too long: ${timePassed / 1000}s`)
            setTimeout(doLoop, Math.max(0, timeLeft));
        }
        doLoop();
    }

    stopLoop() {
        this.rendering = false;
    }

    resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

}




export interface HexagonParameters {
    center: [number, number];
    tipRadius: number;
    fillColor?: string;
    strokeColor?: string;
    strokeThickness?: number;
    text?: string;
    textFont?: string;
    textColor?: string;
}

export function drawHexagon(ctx: CanvasRenderingContext2D, paras: HexagonParameters) {
    const [xc, yc] = paras.center;
    const r = paras.tipRadius;
    const rd30 = 2 * Math.PI * 30 / 360;
    const cos30 = Math.cos(rd30);
    const sin30 = Math.sin(rd30);

    if (paras.fillColor) ctx.fillStyle = paras.fillColor;
    if (paras.strokeColor) ctx.strokeStyle = paras.strokeColor;
    if (paras.strokeThickness) ctx.lineWidth = paras.strokeThickness;

    const x0 = xc;
    const y0 = yc + r;
    const x1 = xc + r * cos30;
    const y1 = yc + r * sin30;
    const x2 = xc + r * cos30;
    const y2 = yc - r * sin30;
    const x3 = xc;
    const y3 = yc - r;
    const x4 = xc - r * cos30;
    const y4 = yc - r * sin30;
    const x5 = xc - r * cos30;
    const y5 = yc + r * sin30;


    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x5, y5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (paras.text) {
        if (paras.textColor) {
            ctx.fillStyle = paras.textColor;
        } else if (paras.strokeColor) {
            ctx.fillStyle = paras.strokeColor;
        } else {
            ctx.fillStyle = 'black';
        }
        if (paras.textFont) ctx.font = paras.textFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(paras.text, xc, yc);
    }

}



export interface RadialGradientParameters {
    center: [number, number],
    radius0: number,
    radius1: number,
    colorStops: {color: string, degree: number}[],
}

/**
 * 
const tipRadius = 40;
const rad30 = 2 * Math.PI * 30 / 360;
const distanceH = tipRadius * Math.cos(rad30);
drawHexagon(ctx, {center: [40, 40], tipRadius: tipRadius, fillColor: 'yellow', text: 'first', textFont: '8px sans-serif'});
drawHexagon(ctx, {center: [40 + 2 * distanceH, 40], tipRadius: tipRadius, fillColor: 'green', strokeColor: 'red', text: 'second', strokeThickness: 2});
drawRadialGradient({
    center: [60, 60],
    radius0: 20,
    radius1: 50,
    colorStops: [{
        color: 'rgba(255, 255, 255, 0.5)',
        degree: 0
    }, {
        color: 'rgba(255, 255, 255, 0.0)',
        degree: 1
    }]
})
 */
export function drawRadialGradient(ctx: CanvasRenderingContext2D, paras: RadialGradientParameters) {
    const {center, radius0, radius1, colorStops} = paras;
    const radialGradient = ctx.createRadialGradient(center[0], center[1], radius0, center[0], center[1], radius1);
    for (const stop of colorStops) {
        radialGradient.addColorStop(stop.degree, stop.color);
    }
    ctx.fillStyle = radialGradient;
    const x0 = center[0] - radius1;
    const y0 = center[1] - radius1;
    const w = 2 * radius1;
    const h = 2 * radius1;
    ctx.fillRect(x0, y0, w, h);
}

