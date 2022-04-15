import { hsl, rgb } from 'd3-color';




export function getColors() {
    const lightColor  = rgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-light'));
    const mediumColor = rgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-medium'));
    const darkColor   = rgb(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-dark'));
    
    const lightColorHSL  = hsl(lightColor);
    const mediumColorHSL = hsl(mediumColor);
    const darkColorHSL   = hsl(darkColor);

    return {lightColor, mediumColor, darkColor, lightColorHSL, mediumColorHSL, darkColorHSL};
}