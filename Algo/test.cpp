#include <iostream>
#include <opencv2/opencv.hpp>
using namespace cv;
using namespace std;

int main(int argc, char** argv)
{

    cv::SimpleBlobDetector detector;
    std::vector<KeyPoint> keypoints;
    
    cv::Mat img = cv::imread("Z:/Capstone/Algo/prawn.jpg");

    if (img.empty())
    {
        std::cout << "Could not read the image: " << std::endl;
        cin.get();
        return 1;
    }

    detector.detect(img, keypoints);
    cv::Mat im_with_keypoints;
    cv::drawKeypoints(img, keypoints, im_with_keypoints, Scalar(0, 0, 255), DrawMatchesFlags::DRAW_RICH_KEYPOINTS);
    
    String windowName = "test";
    cv::namedWindow(windowName);

    cv::imshow("keypoints", im_with_keypoints);

    cv::waitKey(0);
    cv::destroyWindow(windowName);
    return 0;
}