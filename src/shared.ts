import { color, hsl, RGBColor, rgb } from 'd3-color';

export const lightColor  = rgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-light'));
export const mediumColor = rgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-medium'));
export const darkColor   = rgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-dark'));

export const lightColorHSL  = hsl(lightColor);
export const mediumColorHSL = hsl(mediumColor);
export const darkColorHSL   = hsl(darkColor);