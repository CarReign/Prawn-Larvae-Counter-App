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
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
const supabase_1 = require("../lib/supabase");
const hash_1 = require("../helper/hash");
function saveImageMatToBucket(imageMat, originalname) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const canvasToSave = (0, canvas_1.createCanvas)(imageMat.cols, imageMat.rows);
            const ctxToSave = canvasToSave.getContext('2d');
            const imageDataToSave = ctxToSave.createImageData(imageMat.cols, imageMat.rows);
            imageDataToSave.data.set(imageMat.data);
            ctxToSave.putImageData(imageDataToSave, 0, 0);
            const result = yield supabase_1.supabase.storage
                .from("countimg")
                .upload(`public/${String((0, hash_1.hashFromString)(originalname))}.jpg`, canvasToSave.toBuffer('image/jpeg').buffer, {
                cacheControl: '3600',
                upsert: true
            });
            return result;
        }
        catch (error) {
            throw new Error(error.message || "saveImageMatToBucket -- unknown server error");
        }
    });
}
exports.default = saveImageMatToBucket;
