import { getImageRatio } from "./getImageRatio";


export default async function generateImageRationMap(images: readonly string[]): Promise<Map<string, number>> {
    const output = new Map<string, number>();
    (await Promise.all(images.map((i) => getImageRatio(i)))).forEach((i, index) => output.set(images[index], i));
    return output;
}
