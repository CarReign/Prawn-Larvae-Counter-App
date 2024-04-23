"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageCount = exports.getCountWithSpecificKernelSize = exports.processCount = void 0;
const opencv_js_1 = require("@techstark/opencv-js");
function processCount(imageMat, kernelSize = 3) {
    const processedMat = new opencv_js_1.Mat();
    (0, opencv_js_1.cvtColor)(imageMat, processedMat, opencv_js_1.COLOR_RGBA2GRAY);
    (0, opencv_js_1.GaussianBlur)(processedMat, processedMat, new opencv_js_1.Size(3, 3), 0);
    (0, opencv_js_1.adaptiveThreshold)(processedMat, processedMat, 255, opencv_js_1.ADAPTIVE_THRESH_GAUSSIAN_C, opencv_js_1.THRESH_BINARY, 11, 12);
    // dilate(processedMat, processedMat, getStructuringElement(MORPH_ELLIPSE, new Size(kernelSize, kernelSize)));
    (0, opencv_js_1.morphologyEx)(processedMat, processedMat, opencv_js_1.MORPH_OPEN, (0, opencv_js_1.getStructuringElement)(opencv_js_1.MORPH_ELLIPSE, new opencv_js_1.Size(3, 3)), undefined, 3);
    ;
    const contours = new opencv_js_1.MatVector();
    (0, opencv_js_1.findContours)(processedMat, contours, new opencv_js_1.Mat(), opencv_js_1.RETR_EXTERNAL, opencv_js_1.CHAIN_APPROX_SIMPLE);
    return { contours, processedMat };
}
exports.processCount = processCount;
function getCountWithSpecificKernelSize(imageMat, kernelSize) {
    console.log("counting with kernel size:", kernelSize, "x", kernelSize);
    const { contours } = processCount(imageMat, kernelSize);
    return ((contours === null || contours === void 0 ? void 0 : contours.size()) && (contours === null || contours === void 0 ? void 0 : contours.size())) || 0;
}
exports.getCountWithSpecificKernelSize = getCountWithSpecificKernelSize;
function getAverageCount(imageMat) {
    const counts = [];
    const arrContours = [];
    for (let i = 1; i <= 3; i++) {
        const { contours } = processCount(imageMat, i);
        counts.push(((contours === null || contours === void 0 ? void 0 : contours.size()) && (contours === null || contours === void 0 ? void 0 : contours.size())) || 0);
        arrContours.push(contours || new opencv_js_1.MatVector());
    }
    ;
    console.log("counts:", counts);
    // average using reduce
    const total = counts.reduce((acc, curr) => acc + curr);
    const mean = total / counts.length;
    // get the counts that is closest to mean
    const closest = counts.reduce((prev, curr) => Math.abs(curr - mean) < Math.abs(prev - mean) ? curr : prev);
    return { count: closest, contours: arrContours[counts.indexOf(closest)], kernelSize: (counts.indexOf(closest) + 2) };
}
exports.getAverageCount = getAverageCount;
