import { DisplayObject } from "pixi.js";


export interface Renderable {
    getDisplayObject(): DisplayObject;
    update(deltaT: number): void;
}