package com.capstonics.prawncounterapi.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.highgui.HighGui;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.capstonics.prawncounterapi.service.CounterService;

@RestController
@RequestMapping("/api/counter")
public class CounterController {

    @Value("${linux.image.path}")
    private String linuxImagePath;

    @Value("${windows.image.path}")
    private String windowsImagePath;

    @Value("${linux.processed.image.path}")
    private String linuxProcessedImagePath;

    @Value("${windows.processed.image.path}")
    private String windowsProcessedImagePath;

    @Autowired
    private CounterService counterService;

    /// get endpoint that returns a json with message "Hello World from api"
    @GetMapping()
    public Message getCounter() {
        return new Message("Hello World from api");
    }

    @GetMapping("/test")
    public Message test(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return new Message("File is empty");
        }

        try {

            return new Message("Test is finished");
        } catch (Exception e) {
            return new Message("Error: " + e.getMessage());
        }
    }

    @PostMapping()
    public Message count(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return new Message("File is empty");
        }

        try {
            String fileName = file.getOriginalFilename();
            Assert.notNull(fileName, "File name is null");

            String os = System.getProperty("os.name").toLowerCase();
            String initialPath = os.contains("win") ? windowsImagePath : linuxImagePath;
            String finalPath = os.contains("win") ? windowsProcessedImagePath : linuxProcessedImagePath;

            File dest = new File(initialPath + "/" + fileName);
            file.transferTo(dest);

            Mat imageMat = Imgcodecs.imread(dest.getAbsolutePath());

            // Convert to grayscale
            Imgproc.cvtColor(imageMat, imageMat, Imgproc.COLOR_BGR2GRAY);

            // Apply Gaussian blur
            int kernelSize = 5; // Kernel size (5x5)
            Imgproc.GaussianBlur(imageMat, imageMat, new Size(kernelSize, kernelSize), 0);

            // Apply dilation
            int iterations = 4;
            Mat kernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(3, 3));
            Mat dilated = new Mat();
            Imgproc.dilate(imageMat, dilated, kernel, new Point(-1, -1), iterations);

            List<MatOfPoint> contours = new ArrayList<>();
            Mat hierarchy = new Mat();
            Imgproc.findContours(dilated.clone(), contours, hierarchy, Imgproc.RETR_EXTERNAL,
                    Imgproc.CHAIN_APPROX_NONE);

            Imgproc.drawContours(imageMat, contours, -1, new Scalar(0, 255, 0), 4);

            Imgcodecs.imwrite(finalPath + "/processed-" + fileName, imageMat);

            return new Message("Counts: " + contours.size());
        } catch (IOException e) {
            return new Message("Error: " + e.getMessage());
        }
    }

    @PostMapping(value = "/save")
    public Message saveCounter(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return new Message("File is empty");
        }

        try {
            String fileName = file.getOriginalFilename();
            Assert.notNull(fileName, "File name is null");

            String os = System.getProperty("os.name").toLowerCase();
            String path = os.contains("win") ? windowsImagePath : linuxImagePath;

            File dest = new File(path + "/" + fileName);
            file.transferTo(dest);

            return new Message("File saved in: " + dest);
        } catch (IOException e) {
            return new Message("Error: " + e.getMessage());
        }
    }
}

class Message {

    public String message;

    public Message(String message) {
        this.message = message;
    }

}