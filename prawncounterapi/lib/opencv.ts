import { dilate, findContours, RETR_TREE, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY_INV, MORPH_OPEN, morphologyEx, CHAIN_APPROX_SIMPLE, MatVector, getStructuringElement, MORPH_ELLIPSE, adaptiveThreshold, Mat, COLOR_RGBA2GRAY, cvtColor, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, BORDER_DEFAULT, Point, Size, GaussianBlur, KeyPoint, RETR_EXTERNAL, RETR_LIST, RETR_CCOMP } from "@techstark/opencv-js";
import { CountType, ProcessedMatType } from "../routes/types";
import * as cv from "@techstark/opencv-js";

export function processCount(imageMat: Mat, kernelSize: number = 3): ProcessedMatType {
    const processedMat: Mat = new Mat();
    cvtColor(imageMat, processedMat, COLOR_RGBA2GRAY);
    // GaussianBlur(processedMat, processedMat, new Size(3, 3), 0,);
    adaptiveThreshold(processedMat, processedMat, 255, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY_INV, 21, 10);
    // dilate(processedMat, processedMat, getStructuringElement(MORPH_ELLIPSE, new Size(kernelSize, kernelSize)));
    morphologyEx(processedMat, processedMat, MORPH_OPEN, getStructuringElement(MORPH_ELLIPSE, new Size(1, 1)), new Point(-1, -1), 3);;
    const contours: MatVector = new MatVector();
    findContours(processedMat, contours, new Mat(), RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);
    return { contours, processedMat };
}

export function getCountWithSpecificKernelSize(imageMat: Mat, kernelSize: number): number {
    console.log("counting with kernel size:", kernelSize, "x", kernelSize,);
    const { contours }: Omit<ProcessedMatType, "processedMat"> = processCount(imageMat, kernelSize);
    return (contours?.size() && contours?.size()) || 0;
}

export function getAverageCount(imageMat: Mat): CountType {
    const counts = [];
    const arrContours: MatVector[] = [];
    // NOTE: removed for loop to avoid redundancy
    const { contours } = processCount(imageMat, 3);
    counts.push((contours?.size() && contours?.size()) || 0);
    arrContours.push(contours || new MatVector());
    console.log("counts:", counts);
    // average using reduce
    const total = counts.reduce((acc, curr) => acc + curr);
    const mean = total / counts.length;
    // get the counts that is closest to mean
    const closest = counts.reduce((prev, curr) => Math.abs(curr - mean) < Math.abs(prev - mean) ? curr : prev);
    return { count: closest, contours: arrContours[counts.indexOf(closest)], kernelSize: (counts.indexOf(closest) + 2) };
}