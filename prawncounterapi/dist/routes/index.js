"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const supabase_1 = require("../lib/supabase");
const canvas_1 = require("../lib/canvas");
const opencv_1 = require("../lib/opencv");
const opencv_js_1 = require("@techstark/opencv-js");
const saveToBucket_1 = __importDefault(require("../utility/saveToBucket"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.post("/counter", upload.single("image-to-count"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("req.file:", req.file);
        const { kernelSize, } = req.body;
        const { file } = req;
        if (!file)
            throw new Error("No image file found");
        if (!(file === null || file === void 0 ? void 0 : file.buffer))
            throw new Error("No image buffer found");
        if (!(file === null || file === void 0 ? void 0 : file.mimetype))
            throw new Error("No image mimetype found");
        if (!(file === null || file === void 0 ? void 0 : file.mimetype.startsWith("image/")) || (file === null || file === void 0 ? void 0 : file.mimetype.endsWith('png')))
            throw new Error("Invalid image");
        const imageData = (0, canvas_1.getImageDataFromBuffer)(file.buffer);
        if (imageData.data.every((value) => value === 0))
            throw new Error("Invalid image data");
        const imageMat = (0, opencv_js_1.matFromImageData)(imageData);
        let data;
        if (kernelSize) {
            const count = (0, opencv_1.getCountWithSpecificKernelSize)(imageMat, Number(kernelSize));
            data = { count };
        }
        else {
            const count = (0, opencv_1.getAverageCount)(imageMat);
            data = Object.assign({}, count);
        }
        res.status(200).json({ success: true, data, message: "image processed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message || "unknown server error" });
    }
}));
router.get("/counter/image/:filepath", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filepath } = req.params;
        const result = yield supabase_1.supabase.storage.from("countimg").download(`public/${filepath}.jpg`);
        if (result === null || result === void 0 ? void 0 : result.error)
            throw new Error(result.error.message || "supabase unknown error");
        const buffer = Buffer.from(yield result.data.arrayBuffer());
        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': buffer.length
        });
        res.end(buffer);
    }
    catch (error) {
        res.status(500).json({ message: error.message || "unknown server error" });
    }
}));
router.post("/counter/image", upload.single("image-to-count"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { kernelSize, } = req.body;
        const { file } = req;
        if (!file)
            throw new Error("No image file found");
        if (!(file === null || file === void 0 ? void 0 : file.buffer))
            throw new Error("No image buffer found");
        if (!(file === null || file === void 0 ? void 0 : file.mimetype))
            throw new Error("No image mimetype found");
        if (!(file === null || file === void 0 ? void 0 : file.mimetype.startsWith("image/")) || (file === null || file === void 0 ? void 0 : file.mimetype.endsWith('png')))
            throw new Error("Invalid image");
        const imageData = (0, canvas_1.getImageDataFromBuffer)(file.buffer);
        if (imageData.data.every((value) => value === 0))
            throw new Error("Invalid image data");
        console.log("get image data:", imageData);
        const imageMat = (0, opencv_js_1.matFromImageData)(imageData);
        let resultingContours;
        if (kernelSize) {
            const { contours, processedMat } = (0, opencv_1.processCount)(imageMat, Number(kernelSize));
            resultingContours = contours;
        }
        else {
            const { count, contours, kernelSize: resultingKernelSize } = (0, opencv_1.getAverageCount)(imageMat);
            resultingContours = contours;
        }
        if (!resultingContours)
            throw new Error("Contours value is undefined");
        (0, opencv_js_1.drawContours)(imageMat, resultingContours, -1, [0, 255, 0, 255], 2);
        const result = yield (0, saveToBucket_1.default)(imageMat, file.originalname);
        console.log("supabase result:", result);
        if (result.error)
            throw new Error(((_a = result === null || result === void 0 ? void 0 : result.error) === null || _a === void 0 ? void 0 : _a.message) || "supabase unknown error");
        return res.status(200).json({ success: true, path: result.data.path, count: resultingContours.size(), message: "image processed and saved successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message || "unknown server error" });
    }
    ;
}));
router.post("/counter/test", upload.single("image-to-count"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
router.post("/counter/test/save", upload.single("image-to-count"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { file } = req;
        if (!file)
            throw new Error("No image file found");
        if (!(file === null || file === void 0 ? void 0 : file.buffer))
            throw new Error("No image buffer found");
        if (!(file === null || file === void 0 ? void 0 : file.mimetype))
            throw new Error("No image mimetype found");
        if (!(file === null || file === void 0 ? void 0 : file.mimetype.startsWith("image/")) || (file === null || file === void 0 ? void 0 : file.mimetype.endsWith('png')))
            throw new Error("Invalid image");
        const imageData = (0, canvas_1.getImageDataFromBuffer)(file.buffer);
        if (imageData.data.every((value) => value === 0))
            throw new Error("Invalid image data");
        console.log("get image data:", imageData);
        const imageMat = (0, opencv_js_1.matFromImageData)(imageData);
        const result = yield (0, saveToBucket_1.default)(imageMat, file.originalname);
        console.log("supabase result:", result);
        if (result.error)
            throw new Error(((_b = result === null || result === void 0 ? void 0 : result.error) === null || _b === void 0 ? void 0 : _b.message) || "supabase unknown error");
        return res.status(200).json({ success: true, message: "image processed successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message || "unknown server error" });
    }
}));
exports.default = router;
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
