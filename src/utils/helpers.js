export const converterDistanciaKM = (distanciaMetros) => {
    const distanciaKM = parseFloat(distanciaMetros) / 1000;
    return distanciaKM.toFixed(2);
}