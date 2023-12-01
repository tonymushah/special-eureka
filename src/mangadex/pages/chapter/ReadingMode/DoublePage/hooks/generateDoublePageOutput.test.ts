import { expect, describe, test } from "vitest";
import { DoublePageImageInput } from "./useDoublePageImageQuery";
import images from "../../SinglePage/tests/images/250f091f-4166-4831-9f45-89ff54bf433b/images";
import arrayShuffle from "array-shuffle";
import generateDoublePageOutput from "./generateDoublePageOutput";

function collectLenght(_input: DoublePageImageInput[]): number {
    let length = 0;

    _input.forEach((i) => {
        if (typeof i === "string") {
            length += 1;
        } else {
            length += i.length;
        }
    });

    return length;
}

describe("DoublePage Input Output", () => {
    let index = 0;
    const test_limit = 2000;
    while (index < test_limit) {
        test.concurrent(`DIO ${index}`, async () => {
            const to_use = arrayShuffle(images);
            expect(collectLenght(await generateDoublePageOutput(to_use))).toBe(to_use.length);
        });
        index += 1;
    }
});