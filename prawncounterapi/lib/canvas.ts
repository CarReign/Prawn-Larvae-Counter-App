import { Image, createCanvas, ImageData } from "canvas";


export function getImageDataFromBuffer(buffer: Buffer): ImageData {
    const image: Image = new Image();
    console.log("getImageDataFromBuffer: image initialized successfully");
    image.src = Buffer.from(buffer);
    console.log("getImageDataFromBuffer: image buffer loaded successfully");
    const canvas = createCanvas(1, 1); // Create a small canvas (1x1) for drawing the image
    const ctx = canvas.getContext('2d');
    console.log("getImageDataFromBuffer: initialized canvas and context");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    console.log("getImageDataFromBuffer: image drawn to canvas");
    console.log("getImageDataFromBuffer: image dimensions:", image.width, image.height);
    const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log("getImageDataFromBuffer: image data extracted from canvas");
    return imageData;
}