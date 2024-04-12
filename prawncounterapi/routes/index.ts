import { Request, Response, Router, response } from "express";
import { request } from "http";
import multer, { Multer } from "multer";
import * as cv from "@techstark/opencv-js";
import { dilate, findContours, RETR_TREE, CHAIN_APPROX_SIMPLE, MatVector, getStructuringElement, MORPH_ELLIPSE, adaptiveThreshold, Mat, COLOR_RGBA2GRAY, cvtColor, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, BORDER_DEFAULT, Point, Size, GaussianBlur } from "@techstark/opencv-js";
import { Image, createCanvas } from "canvas";
// PLEASE FUCKING REMOVE LATER
import fs from "fs";
import path from "path";

const router: Router = Router();

const upload: Multer = multer();

router.post("/counter", upload.single("image-to-count"), async (req: Request, res: Response) => {
    try {
        console.log("req.file:", req.file);

        const { file } = req;

        if (!file) throw new Error("No image file found");
        if (!file?.buffer) throw new Error("No image buffer found");
        if (!file?.mimetype) throw new Error("No image mimetype found");
        if (!file?.mimetype.startsWith("image/") || file?.mimetype.endsWith('png')) throw new Error("Invalid image");

        const image: Image = new Image();

        console.log("image initialized successfully");

        // ! wrong implementation of buffer.from not translating properly to base 64
        image.src = Buffer.from(file?.buffer);

        // image.src = `data:${file.mimetype};base64,${Buffer.from(file.buffer).toString('base64')}`

        console.log("image buffer loaded successfully");

        const canvas = createCanvas(1, 1); // Create a small canvas (1x1) for drawing the image
        const ctx = canvas.getContext('2d');

        console.log("initialized canvas and context");

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);
        console.log("image drawn to canvas");

        console.log("image dimensions:", image.width, image.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (imageData.data.every((value: number) => value === 0)) throw new Error("Invalid image data");

        console.log("get image data:", imageData);

        const imageMat = cv.matFromImageData(imageData);

        // console.log("created image mat");
        // console.log("image mat:", imageMat.data);

        // const processedMat: cv.Mat = new Mat();

        // cvtColor(imageMat, processedMat, COLOR_RGBA2GRAY, 0);

        // console.log("converted image to gray");
        // console.log("gray mat:", processedMat.data);

        // console.log("getting canvas using graymat cols");
        // console.log("graymay dimensions:", processedMat.cols, processedMat.rows);

        // GaussianBlur(processedMat, processedMat, new Size(3, 3), 0, 0, BORDER_DEFAULT);

        // console.log("blurred image");
        // console.log("blur mat:", processedMat.data);
        // console.log("blur mat dimensions:", processedMat.cols, processedMat.rows);

        // adaptiveThreshold(processedMat, processedMat, 255, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, 11, 12);

        // console.log("thresholded image");
        // console.log("thresholded mat:", processedMat.data);
        // console.log("thresholded mat dimensions:", processedMat.cols, processedMat.rows);

        // dilate(processedMat, processedMat, getStructuringElement(MORPH_ELLIPSE, new Size(3, 3)), new Point(-1, -1), 2);

        // console.log("dilated image");
        // console.log("dilated mat:", processedMat.data);
        // console.log("dilated mat dimensions:", processedMat.cols, processedMat.rows);

        // const contours: cv.MatVector = new MatVector();
        // findContours(processedMat, contours, new Mat(), RETR_TREE, CHAIN_APPROX_SIMPLE);

        // console.log("found contours");
        // console.log("contours:", contours);
        // console.log("contours size:", contours.size());

        const count = getAverageCount(imageMat);
        // ! tets
        // const canvasToSave = createCanvas(grayMat., imageMat.cols);
        // const ctxToSave = canvasToSave.getContext('2d');

        // console.log("initialized canvas to save");

        // const imageDataToSave = ctxToSave.createImageData(grayMat.cols, grayMat.rows);
        // imageDataToSave.data.set(grayMat.data);
        // ctxToSave.putImageData(imageDataToSave, 0, 0);

        // console.log("saving buffer to local storage");

        // fs.writeFileSync(`/home/ren-logronio/Desktop/Prawn-Larvae-Counter-App/.prawncounterapi/image/${file.originalname}.png`, canvasToSave.toBuffer('image/png'));

        // console.log("buffer saved successfully");

        res.status(200).json({ success: true, data: { count }, message: "image processed successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "unknown server error" });
    }
});

type CountType = {
    count: number,
    total: number,
    mean: number,
    counts: number[]
};

function getCountWithSpecificKernelSize(imageMat: cv.Mat, kernelSize: number): CountType {
    const processedMat: cv.Mat = new Mat();
    cvtColor(imageMat, processedMat, COLOR_RGBA2GRAY);
    GaussianBlur(processedMat, processedMat, new Size(3, 3), 0,);
    adaptiveThreshold(processedMat, processedMat, 255, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, 11, 12);
    dilate(processedMat, processedMat, getStructuringElement(MORPH_ELLIPSE, new Size(kernelSize, kernelSize)));
    const contours: cv.MatVector = new MatVector();
    findContours(processedMat, contours, new Mat(), RETR_TREE, CHAIN_APPROX_SIMPLE);
    return { count: contours.size(), total: contours.size(), mean: contours.size(), counts: [contours.size()] };
}

function getAverageCount(imageMat: cv.Mat): CountType {
    const counts = [];
    for (let i = 2; i <= 6; i++) {
        console.log("dilating with kernel size:", i, "x", i,);
        const processedMat: cv.Mat = new Mat();
        cvtColor(imageMat, processedMat, COLOR_RGBA2GRAY);
        GaussianBlur(processedMat, processedMat, new Size(3, 3), 0,);
        adaptiveThreshold(processedMat, processedMat, 255, ADAPTIVE_THRESH_GAUSSIAN_C, THRESH_BINARY, 11, 12);
        dilate(processedMat, processedMat, getStructuringElement(MORPH_ELLIPSE, new Size(i, i)));
        const contours: cv.MatVector = new MatVector();
        findContours(processedMat, contours, new Mat(), RETR_TREE, CHAIN_APPROX_SIMPLE);
        counts.push(contours.size());
    };
    // average using reduce
    const total = counts.reduce((acc, curr) => acc + curr);
    const mean = total / counts.length;
    // get the counts that is closest to mean
    const closest = counts.reduce((prev, curr) => Math.abs(curr - mean) < Math.abs(prev - mean) ? curr : prev);
    return { count: closest, mean, total, counts };
}

export default router;
