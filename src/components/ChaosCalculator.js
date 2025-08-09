import React, { useState } from 'react';

const ChaosCalculator = ({ playSound }) => {
  const [ingredients, setIngredients] = useState(['']);
  const [cookingMethod, setCookingMethod] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [emotion, setEmotion] = useState('');
  const [chaosScore, setChaosScore] = useState(0);
  const [explanation, setExplanation] = useState('');

  const cookingMethods = [
    'Microwave', 'Deep Fry', 'Freeze', 'Blend', 'Grill', 'Steam', 
    'Flambe', 'Sous Vide', 'Air Fry', 'Dehydrate', 'Smoke', 'Freeze Dry'
  ];

  const timesOfDay = [
    'Breakfast', 'Lunch', 'Dinner', 'Midnight Snack', '3AM Confusion', 
    'Brunch', 'Afternoon Tea', 'Pre-Workout', 'Post-Breakup'
  ];

  const emotions = [
    'Happy', 'Sad', 'Angry', 'Confused', 'Rebellious', 'Nostalgic', 
    'Adventurous', 'Tired', 'Existential', 'Chaotic Good'
  ];

  const addIngredient = () => {
    if (ingredients.length < 10) {
      setIngredients([...ingredients, '']);
    }
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const calculateChaos = () => {
    let score = 0;
    let explanationParts = [];

    // Base score from number of ingredients
    const filledIngredients = ingredients.filter(ing => ing.trim() !== '');
    score += filledIngredients.length * 0.5;
    explanationParts.push(`${filledIngredients.length} ingredients (+${filledIngredients.length * 0.5})`);

    // Weird ingredient combinations
    const weirdCombos = {
      'chocolate': ['pizza', 'pasta', 'fish', 'onion', 'garlic', 'curry'],
      'ice cream': ['hot sauce', 'pizza', 'soup', 'bacon', 'pickle'],
      'pickle': ['ice cream', 'chocolate', 'cereal', 'cotton candy'],
      'cotton candy': ['soup', 'pizza', 'salad', 'meat'],
      'energy drink': ['cereal', 'soup', 'pasta', 'ice cream']
    };

    filledIngredients.forEach(ing1 => {
      filledIngredients.forEach(ing2 => {
        if (ing1 !== ing2) {
          Object.entries(weirdCombos).forEach(([key, conflicts]) => {
            if (ing1.toLowerCase().includes(key) && 
                conflicts.some(conflict => ing2.toLowerCase().includes(conflict))) {
              score += 2;
              explanationParts.push(`${ing1} + ${ing2} combo (+2)`);
            }
          });
        }
      });
    });

    // Cooking method chaos
    const chaosMethodScores = {
      'Microwave': 1, 'Blend': 2, 'Freeze': 2, 'Deep Fry': 3,
      'Flambe': 4, 'Dehydrate': 3, 'Freeze Dry': 5
    };
    const methodScore = chaosMethodScores[cookingMethod] || 0;
    score += methodScore;
    if (methodScore > 0) {
      explanationParts.push(`${cookingMethod} method (+${methodScore})`);
    }

    // Time inappropriateness
    const inappropriateTime = {
      'Breakfast': ['ice cream', 'pizza', 'chocolate', 'energy drink'],
      'Midnight Snack': ['soup', 'salad', 'full meal'],
      '3AM Confusion': [] // Everything is inappropriate at 3AM
    };

    if (timeOfDay === '3AM Confusion') {
      score += 3;
      explanationParts.push('3AM timing (+3)');
    } else if (inappropriateTime[timeOfDay]) {
      inappropriateTime[timeOfDay].forEach(inappropriate => {
        if (filledIngredients.some(ing => ing.toLowerCase().includes(inappropriate))) {
          score += 1.5;
          explanationParts.push(`${inappropriate} at ${timeOfDay} (+1.5)`);
        }
      });
    }

    // Emotional state bonus
    const emotionalChaos = {
      'Angry': 2, 'Confused': 3, 'Rebellious': 2.5, 'Existential': 4, 'Chaotic Good': 3
    };
    const emotionScore = emotionalChaos[emotion] || 0;
    score += emotionScore;
    if (emotionScore > 0) {
      explanationParts.push(`${emotion} emotional state (+${emotionScore})`);
    }

    // Cap at 10
    const finalScore = Math.min(10, Math.round(score * 10) / 10);
    setChaosScore(finalScore);
    setExplanation(explanationParts.join(', '));
    playSound('success');
  };

  const getChaosRating = (score) => {
    if (score < 2) return { text: 'Boringly Normal', emoji: '😴', color: '#95a5a6' };
    if (score < 4) return { text: 'Mildly Questionable', emoji: '🤔', color: '#f39c12' };
    if (score < 6) return { text: 'Definitely Weird', emoji: '🤪', color: '#e67e22' };
    if (score < 8) return { text: 'Chaos Incarnate', emoji: '🤯', color: '#e74c3c' };
    return { text: 'Reality-Breaking', emoji: '🌪️', color: '#9b59b6' };
  };

  const rating = getChaosRating(chaosScore);

  return (
    <div className="chaos-calculator">
      <h4>🧮 Scientific Chaos Calculator</h4>
      <p className="calculator-subtitle">Precisely measure the weirdness of your food creation!</p>
      
      <div className="calculator-form">
        <div className="form-section">
          <h5>🥘 Ingredients</h5>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                className="ingredient-field"
              />
              {ingredients.length > 1 && (
                <button 
                  className="remove-ingredient"
                  onClick={() => removeIngredient(index)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          {ingredients.length < 10 && (
            <button className="add-ingredient" onClick={addIngredient}>
              ➕ Add Ingredient
            </button>
          )}
        </div>

        <div className="form-section">
          <h5>👨‍🍳 Cooking Method</h5>
          <select 
            value={cookingMethod} 
            onChange={(e) => setCookingMethod(e.target.value)}
            className="method-select"
          >
            <option value="">Select Method</option>
            {cookingMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <h5>🕐 Time of Consumption</h5>
          <select 
            value={timeOfDay} 
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="time-select"
          >
            <option value="">Select Time</option>
            {timesOfDay.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <h5>😄 Emotional State</h5>
          <select 
            value={emotion} 
            onChange={(e) => setEmotion(e.target.value)}
            className="emotion-select"
          >
            <option value="">Select Emotion</option>
            {emotions.map(emo => (
              <option key={emo} value={emo}>{emo}</option>
            ))}
          </select>
        </div>

        <button 
          className="calculate-btn"
          onClick={calculateChaos}
          disabled={ingredients.filter(ing => ing.trim()).length === 0}
        >
          🔬 Calculate Chaos Level
        </button>
      </div>

      {chaosScore > 0 && (
        <div className="chaos-result">
          <h5>📊 Scientific Analysis Results</h5>
          <div className="chaos-score-display">
            <div className="score-circle" style={{ borderColor: rating.color }}>
              <span className="score-number" style={{ color: rating.color }}>
                {chaosScore}/10
              </span>
              <span className="score-emoji">{rating.emoji}</span>
            </div>
            <div className="score-text">
              <h6 style={{ color: rating.color }}>{rating.text}</h6>
              <p className="explanation">Calculation: {explanation}</p>
            </div>
          </div>
          
          <div className="chaos-recommendations">
            <h6>🎯 Professional Recommendations:</h6>
            {chaosScore < 3 && <p>• Consider adding more questionable ingredients</p>}
            {chaosScore < 5 && <p>• Try an inappropriate cooking method</p>}
            {chaosScore >= 8 && <p>• Congratulations! You've achieved peak chaos</p>}
            {chaosScore === 10 && <p>• Please document this for future generations</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChaosCalculator;
