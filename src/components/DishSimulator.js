import React, { useState, useEffect } from 'react';

const DishSimulator = ({ dish, playSound }) => {
  const [isEating, setIsEating] = useState(false);
  const [biteCount, setBiteCount] = useState(0);
  const [tasteReactions, setTasteReactions] = useState([]);
  const [fullnessLevel, setFullnessLevel] = useState(0);
  const [regretLevel, setRegretLevel] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const reactions = [
    '😋 Surprisingly not terrible!',
    '🤔 My taste buds are confused...',
    '😵 What have I done?',
    '🤯 This shouldn\'t work but it does!',
    '😱 I can taste colors now',
    '🙃 Reality is a lie',
    '🤪 My mouth is having an existential crisis',
    '😇 I\'ve transcended normal eating',
    '🤠 Yeehaw, that\'s... something',
    '🤖 TASTE.EXE has stopped working'
  ];

  const eatBite = () => {
    if (biteCount >= 10) {
      alert('Simulation complete! You\'ve virtually consumed the entire dish. Congratulations on achieving peak uselessness.');
      return;
    }

    setIsEating(true);
    setBiteCount(prev => prev + 1);
    setFullnessLevel(prev => Math.min(100, prev + 10));
    setRegretLevel(prev => Math.min(100, prev + dish.chaos));
    
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    setTasteReactions(prev => [reaction, ...prev].slice(0, 5));
    
    playSound('success');
    
    setTimeout(() => {
      setIsEating(false);
    }, 1000 * simulationSpeed);
  };

  const resetSimulation = () => {
    setBiteCount(0);
    setTasteReactions([]);
    setFullnessLevel(0);
    setRegretLevel(0);
    playSound('click');
  };

  if (!dish) return null;

  return (
    <div className="dish-simulator">
      <h4>🍽️ Virtual Eating Simulator</h4>
      <p className="simulator-subtitle">Experience the chaos without the calories!</p>
      
      <div className="simulation-status">
        <div className="status-bars">
          <div className="status-bar">
            <label>🍽️ Fullness Level:</label>
            <div className="progress-bar">
              <div 
                className="progress-fill fullness" 
                style={{ width: `${fullnessLevel}%` }}
              ></div>
            </div>
            <span>{fullnessLevel}%</span>
          </div>
          
          <div className="status-bar">
            <label>😰 Regret Level:</label>
            <div className="progress-bar">
              <div 
                className="progress-fill regret" 
                style={{ width: `${regretLevel}%` }}
              ></div>
            </div>
            <span>{regretLevel}%</span>
          </div>
        </div>
        
        <div className="bite-counter">
          <span className="bite-count">{biteCount}/10</span>
          <span className="bite-label">Virtual Bites</span>
        </div>
      </div>

      <div className="simulation-controls">
        <button 
          className={`eat-btn ${isEating ? 'eating' : ''}`}
          onClick={eatBite}
          disabled={isEating || biteCount >= 10}
        >
          {isEating ? '😋 Chewing...' : biteCount >= 10 ? '✅ Simulation Complete' : '🍴 Take a Virtual Bite'}
        </button>
        
        <div className="speed-control">
          <label>⚡ Simulation Speed:</label>
          <input 
            type="range" 
            min="0.5" 
            max="3" 
            step="0.5"
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
          />
          <span>{simulationSpeed}x</span>
        </div>
        
        <button className="reset-btn" onClick={resetSimulation}>
          🔄 Reset Simulation
        </button>
      </div>

      {tasteReactions.length > 0 && (
        <div className="taste-reactions">
          <h5>🎭 Virtual Taste Reactions:</h5>
          <div className="reactions-list">
            {tasteReactions.map((reaction, idx) => (
              <div key={idx} className={`reaction-bubble ${idx === 0 ? 'latest' : ''}`}>
                {reaction}
              </div>
            ))}
          </div>
        </div>
      )}

      {biteCount >= 10 && (
        <div className="completion-stats">
          <h5>🏆 Simulation Complete!</h5>
          <div className="final-stats">
            <div className="stat">
              <span className="stat-value">{Math.round((100 - regretLevel) / 10)}/10</span>
              <span className="stat-label">Imaginary Rating</span>
            </div>
            <div className="stat">
              <span className="stat-value">{dish.chaos}</span>
              <span className="stat-label">Chaos Survived</span>
            </div>
            <div className="stat">
              <span className="stat-value">0</span>
              <span className="stat-label">Actual Calories</span>
            </div>
          </div>
          <p className="completion-message">
            🎉 You've successfully eaten {dish.title} in your imagination! 
            Your stomach is confused but your curiosity is satisfied.
          </p>
        </div>
      )}
    </div>
  );
};

export default DishSimulator;
