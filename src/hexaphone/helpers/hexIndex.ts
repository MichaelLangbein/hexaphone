
export function cubeDistance(a: [number, number, number], b: [number, number, number]): number {
    return (
          Math.abs(a[0] - b[0])
        + Math.abs(a[1] - b[1])
        + Math.abs(a[2] - b[2])
    ) / 2;
}

export function hexCoordsToXyCoords(scale: number, alpha: number, beta: number, gamma: number): [number, number] {
    const x =   scale * (alpha  - gamma) * Math.sqrt(3) / 2;
    const y = - scale * beta * 1.5;
    return [x, y];
}

export function xyCoordsToHexCoords(scale: number, x: number, y: number): [number, number, number] {
    const alpha =   (1 / Math.sqrt(3)) * (x / scale) + (1 / 3) * (y / scale);
    const beta  =                                    - (2 / 3) * (y / scale);
    const gamma = - (1 / Math.sqrt(3)) * (x / scale) + (1 / 3) * (y / scale);
    const [alphaR, betaR, gammaR] = getClosestHexCoords(alpha, beta, gamma);
    return [alphaR, betaR, gammaR];
}

export function getClosestHexCoords(alpha: number, beta: number, gamma: number): [number, number, number] {
    const candidates: [number, number, number][]  = [
        [ Math.floor(alpha), Math.floor(beta), - Math.floor(alpha) - Math.floor(beta) ],
        [ Math.ceil(alpha),  Math.floor(beta), - Math.ceil(alpha)  - Math.floor(beta) ],
        [ Math.floor(alpha), Math.ceil(beta),  - Math.floor(alpha) - Math.ceil(beta)  ],
        [ Math.ceil(alpha),  Math.ceil(beta),  - Math.ceil(alpha)  - Math.ceil(beta)  ]
    ];

    const distances = candidates.map(c => {
        return cubeDistance(c, [alpha, beta, gamma]);
    });

    let indexMin = 0;
    let distanceMin = distances[0];
    for (let i = 1; i < distances.length; i++) {
        if (distances[i] < distanceMin) {
            indexMin = i;
            distanceMin = distances[i];
        }
    }

    return candidates[indexMin];
}

export function getHexIndicesAround(x: number, y: number, scale: number, xRadius: number = 0, yRadius: number = 0): string[] {
    const coords = [];
    coords.push(xyCoordsToHexCoords(scale, x,           y          ));
    coords.push(xyCoordsToHexCoords(scale, x,           y + yRadius));
    coords.push(xyCoordsToHexCoords(scale, x,           y - yRadius));
    coords.push(xyCoordsToHexCoords(scale, x + xRadius, y          ));
    coords.push(xyCoordsToHexCoords(scale, x + xRadius, y + yRadius));
    coords.push(xyCoordsToHexCoords(scale, x + xRadius, y - yRadius));
    coords.push(xyCoordsToHexCoords(scale, x - xRadius, y          ));
    coords.push(xyCoordsToHexCoords(scale, x - xRadius, y + yRadius));
    coords.push(xyCoordsToHexCoords(scale, x - xRadius, y - yRadius));

    const coordsString: string[] = [];
    for (let i = 0; i < coords.length; i++) {
        const str = `${coords[i][0]}/${coords[i][1]}/${coords[i][2]}`;
        if (!coordsString.includes(str)) {
            coordsString.push(str);
        }
    }

    return coordsString;
}

export function getKeyboardLayout(width: number, height: number) {
    const rows = 7;
    const scale = height / (7 + 8/2);
    const keysPerRow = (width - (Math.sqrt(3) * scale / 2)) / (Math.sqrt(3) * scale);
    return [keysPerRow, rows, scale];
}
