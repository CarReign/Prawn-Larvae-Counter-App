import { createCanvas } from 'canvas';
import { Mat } from "@techstark/opencv-js";
import { supabase } from '../lib/supabase';
import { hashFromString } from '../helper/hash';

export default async function saveImageMatToBucket(imageMat: Mat, originalname: string) {
    try {
        const canvasToSave = createCanvas(imageMat.cols, imageMat.rows);
        const ctxToSave = canvasToSave.getContext('2d');

        const imageDataToSave = ctxToSave.createImageData(imageMat.cols, imageMat.rows);
        imageDataToSave.data.set(imageMat.data);
        ctxToSave.putImageData(imageDataToSave, 0, 0);

        const result = await supabase.storage
            .from("countimg")
            .upload(
                `public/${String(hashFromString(originalname))}.jpg`, 
                canvasToSave.toBuffer('image/jpeg').buffer,
                {
                    cacheControl: '3600',
                    upsert: true
                }
            );

        return result;
    } catch (error: any) {
        throw new Error(error.message || "saveImageMatToBucket -- unknown server error");
    }
}