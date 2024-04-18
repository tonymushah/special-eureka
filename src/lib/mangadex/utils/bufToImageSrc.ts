export default function bufToImageSrc(buf: Int8Array): string {
    const data = btoa(buf.reduce((data, byte) => data + String.fromCharCode(byte), ""));
    return `data:image/*;base64,${data}`;
}