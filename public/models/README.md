# Face Detection Models

This directory should contain the face-api.js model files for mood detection functionality.

## Required Models

To enable AI mood detection, download these model files from the face-api.js repository:

1. `tiny_face_detector_model-weights_manifest.json`
2. `tiny_face_detector_model-shard1`
3. `face_expression_model-weights_manifest.json`
4. `face_expression_model-shard1`

## Download Instructions

1. Go to https://github.com/justadudewhohacks/face-api.js/tree/master/weights
2. Download the required files listed above
3. Place them in this `/public/models` directory

## Note

The app will work without these models - the mood detection feature will simply show a fallback message and users can still manually select moods.

If models are not available, the camera mood detection will be disabled but all other features will work normally.
