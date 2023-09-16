package com.leonsarks.prawn_larvae_counter;

import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugins.GeneratedPluginRegistrant;
import androidx.annotation.NonNull;

import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.MatOfKeyPoint;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.features2d.SimpleBlobDetector;
import org.opencv.features2d.SimpleBlobDetector_Params;
import org.opencv.features2d.Features2d;


import io.flutter.plugin.common.MethodChannel;

public class MainActivity extends FlutterActivity {

    private static final String CHANNEL = "com.leonsarks.prawn_larvae_counter/opencv";

    // Flutter engine config
    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        GeneratedPluginRegistrant.registerWith(flutterEngine);
        // new method channel
        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL).setMethodCallHandler(
            (call, result) -> {
                // Note: this method is invoked on the main thread
                if (call.method.equals("countLarvae")) {
                    byte[] imageData = call.argument("imageData");
                    try {
                        int larvaeCount = countLarvae(imageData) ;
                        result.success(larvaeCount);
                    } catch (Exception e) {
                        result.error("UNAVAILABLE", "Larvae counter not available.", null);
                    }
                } else if (call.method.equals("getBlobDetectionImage")) {
                    byte[] imageData = call.argument("imageData");
                    try {
                        byte[] resultImageData = getBlobDetectionImage(imageData);
                        result.success(resultImageData);
                    } catch (Exception e) {
                        result.error("UNAVAILABLE", "Larvae counter not available.", null);
                    }
                } else {
                    result.notImplemented();
                }
            }
        );
    }

    private int countLarvae(byte[] imageData) {
        // make mat from imageData
        larvaeCount larvaeCount = doBlobDetection(imageData);
        return larvaeCount.count;
    }

    private byte[] getBlobDetectionImage(byte[] imageData) {
        // make mat from imageData
        larvaeCount larvaeCount = doBlobDetection(imageData);
        return larvaeCount.imageData;
    }

    private larvaeCount doBlobDetection(byte[] imageData) {

        // make mat from imageData
        Mat imageMat = Imgcodecs.imdecode(new MatOfByte(imageData), Imgcodecs.IMREAD_UNCHANGED);
        // convert to grayscale
        Mat grayMat = new Mat();
        Imgproc.cvtColor(imageMat, grayMat, Imgproc.COLOR_BGR2GRAY);

        // make a simple blob detector setting
        SimpleBlobDetector_Params params = new SimpleBlobDetector_Params();
        params.set_minThreshold(100);
        params.set_maxThreshold(200);

        // make a simple blob detector
        SimpleBlobDetector detector = SimpleBlobDetector.create(params);
        MatOfKeyPoint keypoints = new MatOfKeyPoint();

        // circle in the keypoints to the original image
        Mat imageMatWithKeypoints = new Mat();
        Features2d.drawKeypoints(grayMat, keypoints, imageMatWithKeypoints);

        //convert imageMatWithKeypoints to byte array
        MatOfByte matOfByte = new MatOfByte();
        Imgcodecs.imencode(".jpg", imageMatWithKeypoints, matOfByte);
        byte[] imageMatWithKeypointsByteArray = matOfByte.toArray();

        // detect blobs
        detector.detect(grayMat, keypoints);

        // create larvaeCount object
        return new larvaeCount(keypoints.toArray().length, imageMatWithKeypointsByteArray);
    }

}
class larvaeCount {
    public int count;
    public byte[] imageData;

    public larvaeCount(int count, byte[] imageData) {
        this.count = count;
        this.imageData = imageData;
    }
}