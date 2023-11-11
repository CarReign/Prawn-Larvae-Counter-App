package com.prawnapp.prawnapp;

import android.util.Log;

import androidx.annotation.NonNull;

import org.opencv.android.OpenCVLoader;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.util.ArrayList;
import java.util.List;

import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;

public class MainActivity extends FlutterActivity {
    static {
        if (!OpenCVLoader.initDebug()) {
        // Handle initialization error
            Log.d("openCV","OpenCV - Failed to load OpenCV");
        }
    }

    // factory engine configuration flutter
    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
        // initialize the blob detector


        // initialize methodchannel
        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), "methodchannel.prawnapp").setMethodCallHandler(
            (call, result) -> {
                if (call.method.equals("countBlobs")) {
                    final String imagePath = call.argument("imagePath");
                    Log.d("methodChannel", "imagePath : " + imagePath);
                    if (imagePath != null) {
                        Log.d("methodChannel", "imageData Length :" + imagePath.length());
                    } else {
                        Log.d("methodChannel", "imageData : null");
                    }
                    try {
                        int count = countBlobs(imagePath);
                        result.success(count);

                    } catch (Exception e) {
                        result.error("UNEXPLAINED_ERROR", "Error: " + e.getMessage(), null);
                    }
                }
            }
        );
    }

    private int countBlobs(String imagePath) {
        final long start = System.nanoTime();
        // convert to mat
        Log.d("openCV","OpenCV - Executed countBlobs @ Time : " + start);
        Log.d("openCV","OpenCV - imread running @ time : " + System.nanoTime());
        Mat image = Imgcodecs.imread(imagePath);
        Log.d("openCV","OpenCV - Loaded Image @ time : " + System.nanoTime() + " : " + imagePath);
        Log.d("openCV", "OpenCV - Image Channels : " + image.channels());

        Log.d("openCV","OpenCV - image.clone running @ time : " + System.nanoTime());
        Mat tmp = image.clone();
        Log.d("openCV","OpenCV - image.clone complete @ time : " + System.nanoTime());
        Log.d("openCV","OpenCV - Converting colors @ time : " + System.nanoTime());
        Imgproc.cvtColor(image, image, Imgproc.COLOR_BGR2GRAY);
        Log.d("openCV","OpenCV - Converted colors @ time : " + System.nanoTime());
        Log.d("openCV","OpenCV - Gaussian Blur running @ time : " + System.nanoTime());
        Imgproc.GaussianBlur(image, image, new Size(5,5), 0);
        Log.d("openCV","OpenCV - Gaussian Blur complete @ time : " + System.nanoTime());
        Log.d("openCV","OpenCV - Canny running @ time : " + System.nanoTime());
        Imgproc.Canny(image, image, 20, 150);
        Log.d("openCV","OpenCV - Canny complete @ time : " + System.nanoTime());

        Log.d("openCV","OpenCV - Dilate running @ time : " + System.nanoTime());
        int iterations = 2;
        Mat kernel = new Mat(3, 3, CvType.CV_8U);
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                kernel.put(i, j, 1);
            }
        }
        Imgproc.dilate(image, image, kernel, new Point(-1, -1), iterations);
        Log.d("openCV","OpenCV - Dilate complete @ time : " + System.nanoTime());
        List<MatOfPoint> contours = new ArrayList<>();
        Mat hierarchy = new Mat();
        Log.d("openCV","OpenCV - findContours running @ time : " + System.nanoTime());
        Imgproc.findContours(image, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_NONE);
        Log.d("openCV","OpenCV - findContours complete @ time : " + System.nanoTime());
        Log.d("openCV","OpenCV - drawContours running @ time : " + System.nanoTime());
        Imgproc.drawContours(tmp, contours, -1, new Scalar(200, 155, 50), 2);
        Log.d("openCV","OpenCV - drawContours complete @ time : " + System.nanoTime());

        // overwrite image path with tmp
        Log.d("openCV","OpenCV - Writing tmp image @ time : " + System.nanoTime());
        Imgcodecs.imwrite(imagePath, tmp);
        Log.d("openCV","OpenCV - Wrote tmp image @ time : " + System.nanoTime());

        final int result = contours.toArray().length;
        Log.d("openCV","OpenCV - Executed countBlobs @ Time : " + System.nanoTime() + ", Result :" + result);
        return result;
    }
}

/*
        // initialize blob detector
        SimpleBlobDetector_Params params = new SimpleBlobDetector_Params();
        params.set_maxThreshold(255);
        params.set_minThreshold(100);
        Log.d("openCV","OpenCV - Blob Detector Params Set");
        SimpleBlobDetector detector = SimpleBlobDetector.create(params);
        Log.d("openCV","OpenCV - Blob Detector Created");
        // detect blobs
        MatOfKeyPoint keypoints = new MatOfKeyPoint();

        detector.detect(image, keypoints);
        Log.d("openCV","OpenCV - Blobs Detected");
        Log.d("openCV","OpenCV - Number of Blobs: " + keypoints.toArray().length);
        // return number of blobs
        */