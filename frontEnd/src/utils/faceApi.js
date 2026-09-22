/**
 * face-api.js helpers
 *
 * Model weights must be in /public/models:
 *   tiny_face_detector_model
 *   face_landmark_68_model
 *   face_recognition_model
 *
 * Download from:
 *   https://github.com/justadudewhohacks/face-api.js/tree/master/weights
 */
import * as faceapi from 'face-api.js';

const MODEL_URL = '/models';
let loaded = false;

export const loadModels = async () => {
  if (loaded) return;
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  ]);
  loaded = true;
};

/** Returns 128-element plain Array or null if no face detected */
export const getDescriptor = async (videoEl) => {
  const det = await faceapi
    .detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions({ inputSize: 320 }))
    .withFaceLandmarks()
    .withFaceDescriptor();
  return det ? Array.from(det.descriptor) : null;
};

/** Draw face box + landmarks onto an overlay canvas */
export const drawDetections = async (videoEl, canvasEl) => {
  const dets = await faceapi
    .detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks();
  const dims = faceapi.matchDimensions(canvasEl, videoEl, true);
  const resized = faceapi.resizeResults(dets, dims);
  const ctx = canvasEl.getContext('2d');
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  faceapi.draw.drawDetections(canvasEl, resized);
  faceapi.draw.drawFaceLandmarks(canvasEl, resized);
};

export { faceapi };
