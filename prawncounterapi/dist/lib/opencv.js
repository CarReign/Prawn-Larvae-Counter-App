"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageCount = exports.getCountWithSpecificKernelSize = exports.processCount = void 0;
const opencv_js_1 = require("@techstark/opencv-js");
const cv = __importStar(require("@techstark/opencv-js"));
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
//         const color = new cv.Scalar(Math.random() * 255, Math.random() * 255, Math.random() * 255);
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
function processCount(imageMat, kernelSize = 1) {
    const imgGray = new opencv_js_1.Mat();
    cv.cvtColor(imageMat, imgGray, cv.COLOR_RGBA2GRAY);
    const adaptiveThresholdMat = new cv.Mat();
    cv.adaptiveThreshold(imgGray, adaptiveThresholdMat, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY_INV, 21, 10);
    const openingMat = new cv.Mat();
    cv.morphologyEx(adaptiveThresholdMat, openingMat, cv.MORPH_OPEN, cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(3, 3)), new cv.Point(-1, -1), 3);
    const contours = new cv.MatVector();
    cv.findContours(openingMat, contours, new cv.Mat(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    return { contours, processedMat: openingMat };
}
exports.processCount = processCount;
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
function getCountWithSpecificKernelSize(imageMat, kernelSize) {
    console.log("counting with kernel size:", kernelSize, "x", kernelSize);
    const { contours } = processCount(imageMat, kernelSize);
    return ((contours === null || contours === void 0 ? void 0 : contours.size()) && (contours === null || contours === void 0 ? void 0 : contours.size())) || 0;
}
exports.getCountWithSpecificKernelSize = getCountWithSpecificKernelSize;
function getAverageCount(imageMat) {
    const counts = [];
    const arrContours = [];
    // NOTE: removed for loop to avoid redundancy
    const { contours } = processCount(imageMat, 3);
    counts.push(((contours === null || contours === void 0 ? void 0 : contours.size()) && (contours === null || contours === void 0 ? void 0 : contours.size())) || 0);
    arrContours.push(contours || new opencv_js_1.MatVector());
    console.log("counts:", counts);
    // average using reduce
    const total = counts.reduce((acc, curr) => acc + curr);
    const mean = total / counts.length;
    // get the counts that is closest to mean
    const closest = counts.reduce((prev, curr) => Math.abs(curr - mean) < Math.abs(prev - mean) ? curr : prev);
    return { count: closest, contours: arrContours[counts.indexOf(closest)], kernelSize: (counts.indexOf(closest) + 2) };
}
exports.getAverageCount = getAverageCount;
