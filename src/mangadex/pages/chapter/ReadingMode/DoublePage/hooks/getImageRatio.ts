import { getImageSize } from "./getImageSize";

export async function getImageRatio(url: string) {
    const size = await getImageSize(url);
    return size.width / size.height;
}
