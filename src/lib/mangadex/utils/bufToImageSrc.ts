import { XMLParser } from "fast-xml-parser";

export default function bufToImageSrc(buf: Int8Array): string {
    const pre_data = buf.reduce((data, byte) => data + String.fromCharCode(byte), "");
    const xmlp = new XMLParser();
    try {
        const jObj = xmlp.parse(pre_data);
        if (jObj.svg) {
            return pre_data;
        } else {
            const data = btoa(pre_data);
            return `data:image/*;base64,${data}`;
        }
    } catch (error) {
        const data = btoa(pre_data);
        return `data:image/*;base64,${data}`;
    }

}