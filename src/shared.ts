import { hsl, rgb } from 'd3-color';

console.log('reading css color-values ...');
export const lightColor  = rgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-light'));
export const mediumColor = rgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-medium'));
export const darkColor   = rgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-dark'));
console.log(lightColor, mediumColor, darkColor);

export const lightColorHSL  = hsl(lightColor);
export const mediumColorHSL = hsl(mediumColor);
export const darkColorHSL   = hsl(darkColor);