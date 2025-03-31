type ImageSize = {
	width: number;
	height: number;
};

export default function getImageSize(src: string): Promise<ImageSize> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("error", (e) => {
			reject(e.error);
		});
		image.addEventListener("load", () => {
			const { height, width } = image;
			resolve({
				height,
				width
			});
		});
		image.src = src;
	});
}
