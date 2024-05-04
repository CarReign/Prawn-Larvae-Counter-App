import { dilate, distanceTransform, threshold, DIST_L2, MORPH_CLOSE, CV_8U, subtract, minMaxLoc, connectedComponents, CV_8UC3, COLOR_GRAY2RGB, drawContours, LINE_8, findContours, RETR_TREE, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY_INV, MORPH_OPEN, morphologyEx, CHAIN_APPROX_SIMPLE, MatVector, getStructuringElement, MORPH_ELLIPSE, adaptiveThreshold, Mat, COLOR_RGBA2GRAY, cvtColor, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, BORDER_DEFAULT, Point, Size, GaussianBlur, KeyPoint, RETR_EXTERNAL, RETR_LIST, RETR_CCOMP } from "@techstark/opencv-js";
import { CountType, ProcessedMatType } from "../routes/types";
import * as cv from "@techstark/opencv-js";

// export function processCount(imageMat: Mat, kernelSize: number = 3): ProcessedMatType {
//     const processedMat: Mat = new Mat();
//     cvtColor(imageMat, processedMat, COLOR_RGBA2GRAY);
//     adaptiveThreshold(processedMat, processedMat, 255, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY_INV, 21, 10);
//     morphologyEx(processedMat, processedMat, MORPH_OPEN, getStructuringElement(MORPH_ELLIPSE, new Size(1, 1)), new Point(-1, -1), 3);

//     const sure_bg = new Mat();
//     dilate(processedMat, sure_bg, getStructuringElement(MORPH_ELLIPSE, new Size(3, 3)), new Point(-1, -1), 3);

//     const dist_transform = new Mat();
//     const sure_fg = new Mat();
//     const unknown = new Mat();
//     distanceTransform(processedMat, dist_transform, DIST_L2, 5);
//     const minMax = minMaxLoc(dist_transform);
//     const maxVal = minMax.maxVal;
//     threshold(dist_transform, sure_fg, 0.7 * maxVal, 255, THRESH_BINARY);

//     sure_fg.convertTo(sure_fg, CV_8U);

//     subtract(sure_bg, sure_fg, unknown);

//     const markers = new Mat();
//     const contours: MatVector = new MatVector();
//     connectedComponents(sure_fg, markers);
//     findContours(sure_fg, contours, new Mat(), RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);

//     const processedImageMat = new Mat();
//     processedMat.convertTo(processedImageMat, CV_8UC3);
//     cvtColor(processedImageMat, processedImageMat, COLOR_GRAY2RGB);
    
//     for (let i = 0; i < contours.size(); i++) {
//         const color = new  Scalar(Math.random() * 255, Math.random() * 255, Math.random() * 255);
//         drawContours(processedImageMat, contours, i, color, 2, LINE_8);
//     }

//     return { contours, processedMat: processedImageMat };
// }

//recentt
// export function processCount(imageMat: Mat, kernelSize: number = 1): ProcessedMatType {
//     const processedMat: Mat = new Mat();
//     cvtColor(imageMat, processedMat, COLOR_RGBA2GRAY);
//     GaussianBlur(processedMat, processedMat, new Size(3, 3), 0);
//     adaptiveThreshold(processedMat, processedMat, 255, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY_INV, 21, 10);
//     dilate(processedMat, processedMat, getStructuringElement(MORPH_ELLIPSE, new Size(kernelSize, kernelSize)));
//     morphologyEx(processedMat, processedMat, MORPH_OPEN, getStructuringElement(MORPH_ELLIPSE, new Size(1, 1)), new Point(-1, -1), 3);

//     const additionalProcessedMat: Mat = new Mat();
//     GaussianBlur(processedMat, additionalProcessedMat, new Size(3, 3), 0);
//     morphologyEx(additionalProcessedMat, additionalProcessedMat, MORPH_CLOSE, getStructuringElement(MORPH_ELLIPSE, new Size(3, 3)));

//     const contours: MatVector = new MatVector();
//     findContours(additionalProcessedMat, contours, new Mat(), RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);

//     return { contours, processedMat: additionalProcessedMat };
// }


export function processCount(imageMat: Mat, kernelSize: number = 1): ProcessedMatType {
    const imgGray = new Mat();
     cvtColor(imageMat, imgGray,  COLOR_RGBA2GRAY);
    const adaptiveThresholdMat = new  Mat();
     adaptiveThreshold(imgGray, adaptiveThresholdMat, 255,  ADAPTIVE_THRESH_MEAN_C,  THRESH_BINARY_INV, 21, 10);
    const openingMat = new  Mat();
     morphologyEx(adaptiveThresholdMat, openingMat,  MORPH_OPEN,  getStructuringElement( MORPH_ELLIPSE, new  Size(3, 3)), new  Point(-1, -1), 3);
    const contours:  MatVector = new  MatVector();
     findContours(openingMat, contours, new  Mat(),  RETR_EXTERNAL,  CHAIN_APPROX_SIMPLE);
    return { contours, processedMat: openingMat };
}

// export function processCount(imageMat: Mat, kernelSize: number = 3): ProcessedMatType {
//     const processedMat: Mat = new Mat();
//     cvtColor(imageMat, processedMat, COLOR_RGBA2GRAY);
//     // GaussianBlur(processedMat, processedMat, new Size(3, 3), 0,);
//     adaptiveThreshold(processedMat, processedMat, 255, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY_INV, 21, 10);
//     // dilate(processedMat, processedMat, getStructuringElement(MORPH_ELLIPSE, new Size(kernelSize, kernelSize)));
//     morphologyEx(processedMat, processedMat, MORPH_OPEN, getStructuringElement(MORPH_ELLIPSE, new Size(1, 1)), new Point(-1, -1), 3);;
//     const contours: MatVector = new MatVector();
//     findContours(processedMat, contours, new Mat(), RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);
//     return { contours, processedMat };
// }

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