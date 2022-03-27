
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