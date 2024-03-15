package com.test.counter;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.highgui.HighGui;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import nu.pattern.OpenCV;

public class Main {
    public static void main(String[] args) {
        OpenCV.loadLocally();

        test("/home/ren-logronio/Desktop/Prawn-Larvae-Counter-App/counter-test/3.jpg");

        HighGui.waitKey(0);
        HighGui.destroyAllWindows();
        System.exit(0);
    }

    public static void test(String filePath) {
        Mat imageMat = Imgcodecs.imread(filePath);

        // Convert to grayscale
        Mat greyScaled = new Mat();
        Imgproc.cvtColor(imageMat, greyScaled, Imgproc.COLOR_BGR2GRAY);

        // Apply Gaussian blur
        Mat blurred = new Mat();
        int kernelSize = 5; // Kernel size (5x5)
        Imgproc.GaussianBlur(greyScaled, blurred, new Size(kernelSize, kernelSize), 0);

        // apply thresholding
        Mat thresholdMat = new Mat();
        Imgproc.threshold(blurred, thresholdMat, 80, 500, Imgproc.THRESH_BINARY);

        // Apply dilation
        int iterations = 8;
        Mat kernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(1, 1));
        Mat dilated = new Mat();
        Imgproc.dilate(thresholdMat, dilated, kernel, new Point(-1, -1), iterations);

        // imshow
        List<MatOfPoint> contours = new ArrayList<>();
        Mat hierarchy = new Mat();
        Imgproc.findContours(dilated, contours, hierarchy, Imgproc.RETR_TREE,
                Imgproc.CHAIN_APPROX_SIMPLE);
        Imgproc.drawContours(imageMat, contours, -1, new Scalar(0, 255, 0), 4);

        System.out.println("Number of prawn larvae: " + contours.size());

        HighGui.imshow("Result", imageMat);
    }
}