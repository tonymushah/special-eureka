import getImageSize from "./getImageSize";

export default async function getImageRatio(src: string): Promise<number> {
	const { width, height } = await getImageSize(src);
	return width / height;
}
