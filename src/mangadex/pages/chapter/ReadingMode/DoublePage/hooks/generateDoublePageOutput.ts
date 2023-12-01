import generateImageRationMap from "./generateImageRationMap";
import { DoublePageImageInput } from "./useDoublePageImageQuery";

export default async function generateDoublePageOutput(images: string[]): Promise<DoublePageImageInput[]> {
    const to_use_map = await generateImageRationMap(images);
    const output: Array<DoublePageImageInput> = [];
    let accumalator: string[] = [];
    function push_accumalator_to_output1() {
        if (accumalator.length == 1) {
            output.push(accumalator[0]);
        } else if (accumalator.length == 2) {
            output.push([accumalator[0], accumalator[1]]);
        }
        accumalator = [];
    }
    function push_accumalator_to_output2() {
        if (accumalator.length == 2) {
            output.push([accumalator[0], accumalator[1]]);
            accumalator = [];
        }
    }
    to_use_map.forEach((value, key) => {
        if (value < 1) {
            accumalator.push(key);
        } else {
            push_accumalator_to_output1();
            output.push(key);
        }
        push_accumalator_to_output2();
    });
    push_accumalator_to_output1();
    return output;

}
