import { getImageSize } from "./getImageSize";
import { DoublePageImageInput } from "./useDoublePageImageQuery";

async function getImageRatio(url: string) {
    const size = await getImageSize(url);
    return size.width / size.height;
}

export default async function generateDoublePageOutput(images: string[]): Promise<DoublePageImageInput[]> {
    const output: Array<DoublePageImageInput> = [];

    for (let index = 1; index < images.length; index++) {

        const currentElement = images[index];

        const previousCurrentElement: string | undefined = (index - 1) >= 0 ? images[index - 1] : undefined;

        const lastElement: DoublePageImageInput | undefined = (output.length != 0) ? output[output.length - 1] : undefined;

        if (previousCurrentElement != undefined && lastElement?.includes(previousCurrentElement) != true) {
            const currentElementRatio = await getImageRatio(currentElement);
            const previousElementRatio = await getImageRatio(previousCurrentElement);
            if (previousElementRatio >= 1) {
                output.push(previousCurrentElement);
            } else if (currentElementRatio >= 1) {
                const lastElement = output[output.length - 1];
                if (previousCurrentElement != undefined) {
                    if (typeof lastElement === "string" && previousCurrentElement != lastElement) {
                        output.push(previousCurrentElement);
                    } else if (Array.isArray(lastElement)) {
                        if (!lastElement.includes(previousCurrentElement)) output.push(previousCurrentElement);
                    }
                }
                output.push(currentElement);
            } else /*(currentElementRatio < 1 && previousElementRatio < 1)*/ {
                output.push([previousCurrentElement, currentElement]);
            }
        }
    }
    return images;

}
