import { createRef, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import * as cv from '@techstark/opencv-js';
import { Mat } from '@techstark/opencv-js';
import './App.css'

function App() {
  const [file, setFile] = useState<any>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [img, setImg] = useState<any>();
  const [count, setCount] = useState<number>(0);

  const originalCanvasRef: any = useRef();
  const grayCanvasRef: any = useRef();
  const adaptiveCanvasRef: any = useRef();
  const openingCanvasRef: any = useRef();
  const contoursCanvasRef: any = useRef();

  const handleSubmit = async () => {
    if (!file) return alert('Please select an image');
    setImgUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    console.log("refs: ", originalCanvasRef.current, grayCanvasRef, adaptiveCanvasRef, openingCanvasRef, contoursCanvasRef);

    if (!img) return;
    const image = cv.imread(img);

    // to gray scale
    const imgGray = new Mat();
    cv.cvtColor(image, imgGray, cv.COLOR_RGBA2GRAY);
    grayCanvasRef.current && cv.imshow(grayCanvasRef.current, imgGray);
    console.log("1")
    const adaptiveThresholdMat = new Mat();
    cv.adaptiveThreshold(imgGray, adaptiveThresholdMat, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY_INV, 21, 10);
    adaptiveCanvasRef.current && cv.imshow(adaptiveCanvasRef.current, adaptiveThresholdMat);
    console.log("2")
    const openingMat = new Mat();
    cv.morphologyEx(adaptiveThresholdMat, openingMat, cv.MORPH_OPEN, cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(3, 3)), new cv.Point(-1, -1), 3);
    openingCanvasRef.current && cv.imshow(openingCanvasRef.current, openingMat);
    console.log("3")
    const contours: cv.MatVector = new cv.MatVector();
    cv.findContours(openingMat, contours, new Mat(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    const imageToOverlay = image.clone();
    cv.drawContours(imageToOverlay, contours, -1, [0, 255, 0, 255], 2);
    contoursCanvasRef.current && cv.imshow(contoursCanvasRef.current, imageToOverlay);
    console.log("4")
    setCount(contours.size());
  }, [img])

  return (
    <>
      <input type='file' accept='image/*' onChange={(e: any) => setFile(e.target.files[0])} />
      <input type='button' value='Upload' onClick={handleSubmit} />
      { imgUrl && <div>
        <h1>Original</h1>
        <img src={imgUrl} onLoad={(e: any) => { setImg(e.target) }} />
        <h1>Grayyed out</h1>
        <canvas ref={grayCanvasRef} />
        <h1>Adaptive threshold</h1>
        <canvas ref={adaptiveCanvasRef} />
        <h1>Opening</h1>
        <canvas ref={openingCanvasRef} />
        <h1>Contours</h1>
        <canvas ref={contoursCanvasRef} />
        <h1>Result: {count}</h1>
      </div>}
    </>
  )
}

export default App
