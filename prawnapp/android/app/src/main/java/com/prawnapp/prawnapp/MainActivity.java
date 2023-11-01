package com.prawnapp.prawnapp;

import android.util.Log;

import io.flutter.embedding.android.FlutterActivity;
import org.opencv.android.OpenCVLoader;
import org.opencv.core.CvType;
import org.opencv.core.MatOfKeyPoint;
import org.opencv.features2d.SimpleBlobDetector;
import org.opencv.features2d.SimpleBlobDetector_Params;
// import mat
import org.opencv.core.Mat;
import org.opencv.imgproc.Imgproc;
// import  flutter engine configuration
import io.flutter.embedding.engine.FlutterEngine;
// IMPORT METHOD CHANNEL
import io.flutter.plugin.common.MethodChannel;
import kotlin.UByteArray;

public class MainActivity extends FlutterActivity {
    static {
        if (!OpenCVLoader.initDebug()) {
        // Handle initialization error
        }
    }

    // factory engine configuration flutter
    @Override
    public void configureFlutterEngine(FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
        // initialize the blob detector


        // initialize methodchannel
        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), "methodchannel.prawnapp").setMethodCallHandler(
            (call, result) -> {
                if (call.method.equals("countBlobs")) {
                    byte[] imageData = call.argument("imageData");
                    int imageHeight = call.argument("imageHeight");
                    int imageWidth = call.argument("imageWidth");
                    Log.d("methodChannel", "imageData Length:" + imageData.length);
                    try {
                        int count = countBlobs(imageData, imageHeight, imageWidth);
                        result.success(count);

                    } catch (Exception e) {
                        result.error("UNEXPLAINED_ERROR", "Error: " + e.getMessage(), null);
                    }
                }
            }
        );
    }

    private int countBlobs(byte[] imageData,int imageHeight,int imageWidth) {
        // convert to mat
        Mat image = new Mat(imageHeight, imageWidth, CvType.CV_8UC1);
        image.put(0, 0, imageData);
        Log.d("openCV","OpenCV - Created Image Mat");
        Log.d("openCV", "OpenCV - imageMat Channels: " + image.channels());
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
        return keypoints.toArray().length;
    }
}
