cvtColor(imageMat, processedMat, COLOR_RGBA2GRAY);
adaptiveThreshold(processedMat, processedMat, 255, ADAPTIVE_THRESH_MEAN_C, THRESH_BINARY_INV, 21, 10);
morphologyEx(processedMat, processedMat, MORPH_OPEN, getStructuringElement(MORPH_ELLIPSE, new Size(3, 3)), new Point(-1, -1), 3);;
const contours: MatVector = new MatVector();
findContours(processedMat, contours, new Mat(), RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);
return { contours, processedMat };