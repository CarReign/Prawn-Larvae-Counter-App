import { MatVector, Mat } from "@techstark/opencv-js";

export type CountType = {
    count: number,
    total?: number,
    mean?: number,
    counts?: number[]
    kernelSize?: number
};

export type ProcessedMatType = {
    contours?: MatVector,
    processedMat: Mat,
};