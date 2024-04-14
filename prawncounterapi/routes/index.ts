import { Request, Response, Router, response } from "express";
import multer, { Multer } from "multer";
import { ImageData, createCanvas } from "canvas";

import { CountType, ProcessedMatType } from "./types";

import { supabase } from "../lib/supabase";
import { getImageDataFromBuffer } from "../lib/canvas";
import { getAverageCount, getCountWithSpecificKernelSize, processCount } from "../lib/opencv";
import { matFromImageData, drawContours, MatVector } from "@techstark/opencv-js";
import * as cv from "@techstark/opencv-js";
import { hashFromString } from "../helper/hash";

const router: Router = Router();

const upload: Multer = multer();

router.post("/counter", upload.single("image-to-count"), async (req: Request, res: Response) => {
    try {
        console.log("req.file:", req.file);
        const { kernelSize, } = req.body;
        const { file } = req;
        if (!file) throw new Error("No image file found");
        if (!file?.buffer) throw new Error("No image buffer found");
        if (!file?.mimetype) throw new Error("No image mimetype found");
        if (!file?.mimetype.startsWith("image/") || file?.mimetype.endsWith('png')) throw new Error("Invalid image");

        const imageData: ImageData = getImageDataFromBuffer(file.buffer);

        if (imageData.data.every((value: number) => value === 0)) throw new Error("Invalid image data");
        console.log("get image data:", imageData);
        const imageMat = matFromImageData(imageData);

        let data: { count: number } | CountType;
        if (kernelSize) {
            const count = getCountWithSpecificKernelSize(imageMat, kernelSize);
            data = { count };
        } else {
            const count = getAverageCount(imageMat);
            data = { ...count };
        }
        res.status(200).json({ success: true, data, message: "image processed successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "unknown server error" });
    }
});

router.post("/counter/save", upload.single("image-to-count"), async (req: Request, res: Response) => {
    try {
        const { kernelSize, } = req.body;
        const { file } = req;

        if (!file) throw new Error("No image file found");
        if (!file?.buffer) throw new Error("No image buffer found");
        if (!file?.mimetype) throw new Error("No image mimetype found");
        if (!file?.mimetype.startsWith("image/") || file?.mimetype.endsWith('png')) throw new Error("Invalid image");

        const imageData: ImageData = getImageDataFromBuffer(file.buffer);

        if (imageData.data.every((value: number) => value === 0)) throw new Error("Invalid image data");
        console.log("get image data:", imageData);
        const imageMat = matFromImageData(imageData);

        const { contours, processedMat }: ProcessedMatType = processCount(imageMat, kernelSize);

        if (!contours) throw new Error("Contours value is undefined");

        /*
        Scalar color = new Scalar(0, 255, 0);
        image.copyTo(imageResult);
        Imgproc.drawContours(imageResult, closestContours, -1, color, 2);
        */
        drawContours(imageMat, contours, -1, [0, 255, 0, 255], 0);


    } catch (error: any) {
        return res.status(500).json({ message: error.message || "unknown server error" });
    };
});

router.post("/counter/test", upload.single("image-to-count"), async (req: Request, res: Response) => {

});

router.post("/counter/test/save", upload.single("image-to-count"), async (req: Request, res: Response) => {
    try {
        const { file } = req;

        if (!file) throw new Error("No image file found");
        if (!file?.buffer) throw new Error("No image buffer found");
        if (!file?.mimetype) throw new Error("No image mimetype found");
        if (!file?.mimetype.startsWith("image/") || file?.mimetype.endsWith('png')) throw new Error("Invalid image");
    
        const imageData: ImageData = getImageDataFromBuffer(file.buffer);
    
        if (imageData.data.every((value: number) => value === 0)) throw new Error("Invalid image data");
        console.log("get image data:", imageData);
        const imageMat = matFromImageData(imageData);

        const canvasToSave = createCanvas(imageMat.cols, imageMat.rows);
        const ctxToSave = canvasToSave.getContext('2d');

        const imageDataToSave = ctxToSave.createImageData(imageMat.cols, imageMat.rows);
        imageDataToSave.data.set(imageMat.data);

        supabase.storage.from("images").upload(`${String(hashFromString(file.originalname))}.jpg`, canvasToSave.toBuffer('image/png'));

    } catch (error: any) {
        return res.status(500).json({ message: error.message || "unknown server error" });
    }
});

export default router;


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