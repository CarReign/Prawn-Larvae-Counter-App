import { dilate, findContours, RETR_TREE, CHAIN_APPROX_SIMPLE, MatVector, getStructuringElement, MORPH_ELLIPSE, adaptiveThreshold, Mat, COLOR_RGBA2GRAY, cvtColor, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, BORDER_DEFAULT, Point, Size, GaussianBlur, KeyPoint } from "@techstark/opencv-js";
import { CountType, ProcessedMatType } from "../routes/types";
import * as cv from "@techstark/opencv-js";

export function processCount(imageMat: Mat, kernelSize: number = 3): ProcessedMatType {
    const processedMat: Mat = new Mat();
    cvtColor(imageMat, processedMat, COLOR_RGBA2GRAY);
    GaussianBlur(processedMat, processedMat, new Size(3, 3), 0,);
    adaptiveThreshold(processedMat, processedMat, 255, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, 11, 12);
    dilate(processedMat, processedMat, getStructuringElement(MORPH_ELLIPSE, new Size(kernelSize, kernelSize)));
    const contours: MatVector = new MatVector();
    findContours(processedMat, contours, new Mat(), RETR_TREE, CHAIN_APPROX_SIMPLE);
    return { contours, processedMat };
}

export function getCountWithSpecificKernelSize(imageMat: Mat, kernelSize: number): number {
    console.log("counting with kernel size:", kernelSize, "x", kernelSize,);
    const { contours }: Omit<ProcessedMatType, "processedMat"> = processCount(imageMat, kernelSize);
    return (contours?.size() && contours?.size() / 2) || 0;
}

export function getAverageCount(imageMat: Mat): CountType {
    const counts = [];
    const arrContours: MatVector[] = [];
    for (let i = 2; i <= 4; i++) {
        const { contours } = processCount(imageMat, i);
        counts.push((contours?.size() && contours?.size() / 2) || 0);
        arrContours.push(contours || new MatVector());
    };
    // average using reduce
    const total = counts.reduce((acc, curr) => acc + curr);
    const mean = total / counts.length;
    // get the counts that is closest to mean
    const closest = counts.reduce((prev, curr) => Math.abs(curr - mean) < Math.abs(prev - mean) ? curr : prev);
    return { count: closest, contours: arrContours[counts.indexOf(closest)], kernelSize: (counts.indexOf(closest) + 2) };
}

/*
1 
4
7
10
*/