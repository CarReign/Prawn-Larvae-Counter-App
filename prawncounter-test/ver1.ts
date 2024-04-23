const imgGray = new cv.Mat();
cv.cvtColor(image, imgGray, cv.COLOR_RGBA2GRAY);
grayCanvasRef.current && cv.imshow(grayCanvasRef.current, imgGray);

const adaptiveThresholdMat = new cv.Mat();
cv.adaptiveThreshold(imgGray, adaptiveThresholdMat, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY_INV, 21, 10);
adaptiveCanvasRef.current && cv.imshow(adaptiveCanvasRef.current, adaptiveThresholdMat);

const openingMat = new cv.Mat();
cv.morphologyEx(adaptiveThresholdMat, openingMat, cv.MORPH_OPEN, cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(3, 3)), new cv.Point(-1, -1), 3);
openingCanvasRef.current && cv.imshow(openingCanvasRef.current, openingMat);

const contours: cv.MatVector = new cv.MatVector();
cv.findContours(openingMat, contours, new cv.Mat(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
const imageToOverlay = image.clone();
cv.drawContours(imageToOverlay, contours, -1, [0, 255, 0, 255], 2);
contoursCanvasRef.current && cv.imshow(contoursCanvasRef.current, imageToOverlay);

setCount(contours.size());