import cv2
import numpy
import matplotlib.pyplot
import IPython

#import image
img = cv2.imread('prawn.png')
matplotlib.pyplot.imshow(img)

#gaussian blur
img_gaussian = cv2.GaussianBlur(img,(5,5),cv2.BORDER_DEFAULT)

#thresholding
ret, thresh = cv2.threshold(img_gaussian, 100, 300, cv2.THRESH_BINARY)
matplotlib.pyplot.imshow(thresh,cmap = 'gray')

#canny edge detection
edges = cv2.Canny(thresh,100,200)
matplotlib.pyplot.imshow(edges, cmap = 'gray')

#blob detection
parameters = cv2.SimpleBlobDetector_Params()
parameters.minThreshold = 100
parameters.maxThreshold = 200
detector = cv2.SimpleBlobDetector_create(parameters)
blob = detector.detect(edges)
img_blob = cv2.drawKeypoints(edges, blob, numpy.array([]), (0,0,255), cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
matplotlib.pyplot.imshow(img_blob)

print(f'Total Count: {len(blob)}')