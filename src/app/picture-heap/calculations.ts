export function solveForBestGridSize(width: number, height: number, numberOfPictures: number) {
    const ratio = width / height;
    const m = Math.floor(Math.sqrt(ratio * numberOfPictures));
    const n = Math.floor(numberOfPictures / m);

    return { m, n };
}

export function getRandomZIndex(numberOfPictures: number) {
    return Math.floor(Math.random() * numberOfPictures);
}
