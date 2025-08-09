import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const MoodDetector = ({ onMoodDetected, isActive }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        setIsModelLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.log('Face detection models not available, using fallback');
        setIsLoading(false);
      }
    };

    if (isActive) {
      loadModels();
    }
  }, [isActive]);

  const detectMood = async () => {
    if (!webcamRef.current || !isModelLoaded || !isActive) return;

    const video = webcamRef.current.video;
    if (!video) return;

    try {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        
        // Map face-api expressions to our moods
        const moodMapping = {
          angry: 'angry_hungry',
          sad: 'single_and_starving',
          neutral: 'productively_lazy',
          happy: 'peaceful_chaotic',
          surprised: 'tired_dramatic'
        };

        // Find the dominant expression
        let maxExpression = '';
        let maxConfidence = 0;
        
        Object.entries(expressions).forEach(([expression, confidence]) => {
          if (confidence > maxConfidence) {
            maxConfidence = confidence;
            maxExpression = expression;
          }
        });

        if (maxConfidence > 0.3) { // Only if we're reasonably confident
          const mappedMood = moodMapping[maxExpression];
          if (mappedMood) {
            setDetectedMood(maxExpression);
            setConfidence(maxConfidence);
            onMoodDetected(mappedMood, maxConfidence);
          }
        }
      }
    } catch (error) {
      console.log('Mood detection error:', error);
    }
  };

  useEffect(() => {
    if (isActive && isModelLoaded) {
      const interval = setInterval(detectMood, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, isModelLoaded]);

  if (!isActive) return null;

  return (
    <div className="mood-detector">
      <div className="camera-container">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="webcam"
          mirrored
        />
        <canvas ref={canvasRef} className="detection-canvas" />
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Loading mood detection...</p>
          </div>
        )}
        
        {!isModelLoaded && !isLoading && (
          <div className="fallback-message">
            <p>📷 Camera mood detection unavailable</p>
            <small>Models not loaded - manual selection only</small>
          </div>
        )}
      </div>
      
      {detectedMood && (
        <div className="mood-result">
          <div className="detected-emotion">
            <strong>Detected: {detectedMood}</strong>
            <div className="confidence-bar">
              <div 
                className="confidence-fill" 
                style={{ width: `${confidence * 100}%` }}
              ></div>
            </div>
            <small>{Math.round(confidence * 100)}% confident</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodDetector;
