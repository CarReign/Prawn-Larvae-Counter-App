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
import saveImageMatToBucket from "../utility/saveToBucket";
import streamToBuffer from "../helper/streamToBuffer";

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
            const count = getCountWithSpecificKernelSize(imageMat, Number(kernelSize));
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

router.get("/counter/image/:filepath", async (req: Request, res: Response) => {
    try {
        const { filepath } = req.params;
        const result = await supabase.storage.from("countimg").download(`public/${filepath}.jpg`);
        if (result?.error) throw new Error(result.error.message || "supabase unknown error");
        const buffer = Buffer.from( await result.data.arrayBuffer() );
        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': buffer.length
        });
        res.end(buffer);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "unknown server error" });
    }
});

router.post("/counter/image", upload.single("image-to-count"), async (req: Request, res: Response) => {
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

        let resultingContours: MatVector | undefined;
        
        if (kernelSize) {
            const { contours, processedMat }: ProcessedMatType = processCount(imageMat, Number(kernelSize));
            resultingContours = contours;
        } else {
            const { count, contours, kernelSize: resultingKernelSize }: CountType = getAverageCount(imageMat);
            resultingContours = contours;
        }

        if (!resultingContours) throw new Error("Contours value is undefined");
    
        drawContours(imageMat, resultingContours, -1, [0, 255, 0, 255], 2);

        const result = await saveImageMatToBucket(imageMat, file.originalname);

        console.log("supabase result:", result);

        if(result.error) throw new Error(result?.error?.message || "supabase unknown error");

        return res.status(200).json({ success: true, path: result.data.path, count: resultingContours.size(), message: "image processed and saved successfully" });
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

        const result = await saveImageMatToBucket(imageMat, file.originalname);

        console.log("supabase result:", result);

        if(result.error) throw new Error(result?.error?.message || "supabase unknown error");

        return res.status(200).json({ success: true, message: "image processed successfully" });
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