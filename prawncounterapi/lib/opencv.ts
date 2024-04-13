import { dilate, findContours, RETR_TREE, CHAIN_APPROX_SIMPLE, MatVector, getStructuringElement, MORPH_ELLIPSE, adaptiveThreshold, Mat, COLOR_RGBA2GRAY, cvtColor, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, BORDER_DEFAULT, Point, Size, GaussianBlur } from "@techstark/opencv-js";
import { CountType } from "../routes/types";

export function getCountWithSpecificKernelSize(imageMat: Mat, kernelSize: number): number {
    console.log("counting with kernel size:", kernelSize, "x", kernelSize,);
    const processedMat: Mat = new Mat();
    cvtColor(imageMat, processedMat, COLOR_RGBA2GRAY);
    GaussianBlur(processedMat, processedMat, new Size(3, 3), 0,);
    adaptiveThreshold(processedMat, processedMat, 255, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, 11, 12);
    dilate(processedMat, processedMat, getStructuringElement(MORPH_ELLIPSE, new Size(kernelSize, kernelSize)));
    const contours: MatVector = new MatVector();
    findContours(processedMat, contours, new Mat(), RETR_TREE, CHAIN_APPROX_SIMPLE);
    return contours.size();
}

export function getAverageCount(imageMat: Mat): CountType {
    const counts = [];
    for (let i = 2; i <= 6; i++) {
        const count = getCountWithSpecificKernelSize(imageMat, i);
        counts.push(count);
    };
    // average using reduce
    const total = counts.reduce((acc, curr) => acc + curr);
    const mean = total / counts.length;
    // get the counts that is closest to mean
    const closest = counts.reduce((prev, curr) => Math.abs(curr - mean) < Math.abs(prev - mean) ? curr : prev);
    return { count: closest, kernelSize: (counts.indexOf(closest) + 2) };
}