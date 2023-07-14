import cv2
import numpy as np

frame = cv2.imread('bg.jpg')

# Incere frame brighness
bright_frame = cv2.add(frame, 50)

# Conver image after appying CLAHE to HSV
hsv_frame = cv2.cvtColor(bright_frame, cv2.COLOR_BGR2HSV)

sensitivity = 70  # Higher value allows wider color range to be considered white color
low_white = np.array([0, 0, 255-sensitivity])
high_white = np.array([255, sensitivity, 255])

white_mask = cv2.inRange(hsv_frame, low_white, high_white)
white = cv2.bitwise_and(frame, frame, mask=white_mask)

cv2.imwrite('white.png', white)  #Save out to file (for testing).


# Show result (for testing).
cv2.imshow('white', white)
cv2.waitKey(0)
cv2.destroyAllWindows()