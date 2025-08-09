import React, { useState, useEffect } from 'react';

const SoundManager = ({ soundEnabled = true }) => {
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    if (soundEnabled && 'AudioContext' in window) {
      setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
    }
  }, [soundEnabled]);

  const playSound = (type, options = {}) => {
    if (!audioContext || !soundEnabled) return;

    const { frequency = 440, duration = 100, volume = 0.1 } = options;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case 'click':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        break;
      
      case 'hover':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        gainNode.gain.setValueAtTime(volume * 0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        break;
      
      case 'success':
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        break;
      
      case 'surprise':
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        break;
      
      case 'chef':
        oscillator.frequency.setValueAtTime(349, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(392, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        break;
      
      default:
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    }

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + (duration / 1000));
  };

  return { playSound };
};

export default SoundManager;
