import React, { useState, useEffect } from 'react';

const UselessFeatures = ({ currentDish, playSound }) => {
  const [dishPersonality, setDishPersonality] = useState('');
  const [weatherRecommendation, setWeatherRecommendation] = useState('');
  const [dishHoroscope, setDishHoroscope] = useState('');
  const [socialCreditScore, setSocialCreditScore] = useState(750);
  const [dishAge, setDishAge] = useState(0);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [dishColor, setDishColor] = useState('#ff7a59');
  const [dishTranslation, setDishTranslation] = useState('');

  const personalities = [
    'Rebellious and edgy', 'Mysteriously alluring', 'Chaotically neutral', 
    'Aggressively wholesome', 'Passive-aggressively delicious', 'Ironically healthy',
    'Suspiciously appetizing', 'Dramatically underwhelming', 'Confidently confused'
  ];

  const weatherRecommendations = [
    'Perfect for a Tuesday afternoon in fictional weather',
    'Best enjoyed during imaginary rainfall', 
    'Ideal temperature: room temperature but emotionally warm',
    'Recommended atmospheric pressure: whatever feels right',
    'Optimal humidity: slightly existential'
  ];

  const horoscopes = [
    'Your dish is in Mercury retrograde - expect flavor confusion',
    'Jupiter aligns with your hunger - chaos levels may increase',
    'Venus suggests adding more questionable ingredients',
    'Mars warns against logical food choices today',
    'Saturn recommends questioning your life choices'
  ];

  const motivationalQuotes = [
    '"Every weird bite is a step toward culinary enlightenment" - Anonymous Chef',
    '"Chaos in the kitchen leads to growth in the soul" - Probably Gandhi',
    '"Normal food is for normal people. You are not normal." - Your Dish',
    '"Embrace the weird, taste the impossible" - Fake Inspirational Person',
    '"Your taste buds called - they want adventure" - Imaginary Nutritionist'
  ];

  const fakeLanguages = [
    { lang: 'Gibberish', translation: 'Flibber jabberwocky nom nommus' },
    { lang: 'Food Latin', translation: 'Chaoticus dishius supremus' },
    { lang: 'Alien', translation: 'Ẍøř₸ɨŋǥ ₼ɇ₳ł øf đøø₼' },
    { lang: 'Robot', translation: 'EXECUTING_TASTE.EXE... ERROR: LOGIC_NOT_FOUND' },
    { lang: 'Cat', translation: 'Meow meow purr... wait, this is weird, meow' }
  ];

  useEffect(() => {
    if (currentDish) {
      // Generate completely useless analysis
      setDishPersonality(personalities[Math.floor(Math.random() * personalities.length)]);
      setWeatherRecommendation(weatherRecommendations[Math.floor(Math.random() * weatherRecommendations.length)]);
      setDishHoroscope(horoscopes[Math.floor(Math.random() * horoscopes.length)]);
      setMotivationalQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
      
      // Random dish age in "food years"
      setDishAge(Math.floor(Math.random() * 100));
      
      // Random color based on chaos level
      const chaosColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
      setDishColor(chaosColors[currentDish.chaos % chaosColors.length]);
      
      // Fake translation
      const randomTranslation = fakeLanguages[Math.floor(Math.random() * fakeLanguages.length)];
      setDishTranslation(`${randomTranslation.lang}: "${randomTranslation.translation}"`);
      
      // Adjust social credit score based on dish chaos
      setSocialCreditScore(prev => {
        const change = currentDish.chaos > 7 ? -Math.floor(Math.random() * 50) : Math.floor(Math.random() * 30);
        return Math.max(0, Math.min(1000, prev + change));
      });
    }
  }, [currentDish]);

  if (!currentDish) return null;

  return (
    <div className="useless-features">
      <h4>🤖 Completely Useless Analysis</h4>
      
      <div className="useless-grid">
        <div className="useless-card">
          <h5>🎭 Dish Personality</h5>
          <p>{dishPersonality}</p>
          <div className="personality-bar">
            <div 
              className="personality-fill" 
              style={{ width: `${currentDish.chaos * 10}%`, backgroundColor: dishColor }}
            ></div>
          </div>
        </div>

        <div className="useless-card">
          <h5>🌤️ Weather Compatibility</h5>
          <p>{weatherRecommendation}</p>
          <div className="weather-indicator">
            <span className="weather-icon">🌈</span>
            <span>Fictional Weather: Perfect</span>
          </div>
        </div>

        <div className="useless-card">
          <h5>🔮 Dish Horoscope</h5>
          <p>{dishHoroscope}</p>
          <div className="horoscope-stars">
            {'⭐'.repeat(Math.floor(Math.random() * 5) + 1)}
          </div>
        </div>

        <div className="useless-card">
          <h5>📊 Social Credit Score Impact</h5>
          <p>Your food choices affect your imaginary social standing!</p>
          <div className="credit-score">
            <span className={socialCreditScore > 500 ? 'good-score' : 'bad-score'}>
              {socialCreditScore}/1000
            </span>
          </div>
        </div>

        <div className="useless-card">
          <h5>🎂 Dish Age Analysis</h5>
          <p>This dish concept is approximately <strong>{dishAge} food years</strong> old</p>
          <div className="age-wisdom">
            {dishAge > 50 ? '🧙‍♂️ Ancient Wisdom' : dishAge > 25 ? '🎓 Mature' : '👶 Young & Reckless'}
          </div>
        </div>

        <div className="useless-card">
          <h5>💬 Fake Translation</h5>
          <p>{dishTranslation}</p>
          <button 
            className="translate-btn"
            onClick={() => {
              const newTranslation = fakeLanguages[Math.floor(Math.random() * fakeLanguages.length)];
              setDishTranslation(`${newTranslation.lang}: "${newTranslation.translation}"`);
              playSound('click');
            }}
          >
            🔄 Retranslate
          </button>
        </div>

        <div className="useless-card motivational">
          <h5>✨ Motivational Nonsense</h5>
          <p className="quote">{motivationalQuote}</p>
          <button 
            className="inspire-btn"
            onClick={() => {
              setMotivationalQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
              playSound('success');
            }}
          >
            🎯 Inspire Me More
          </button>
        </div>

        <div className="useless-card">
          <h5>🎨 Color Psychology</h5>
          <p>Your dish emanates the energy of:</p>
          <div className="color-circle" style={{ backgroundColor: dishColor }}></div>
          <p><em>This means absolutely nothing but looks pretty!</em></p>
        </div>
      </div>

      <div className="useless-actions">
        <button 
          className="useless-btn"
          onClick={() => {
            alert(`Congratulations! You've achieved nothing by clicking this button. Your dish remains ${currentDish.title}.`);
            playSound('click');
          }}
        >
          🎉 Achieve Nothing
        </button>
        
        <button 
          className="useless-btn"
          onClick={() => {
            const analysis = `DISH REPORT:\n${currentDish.title}\nPersonality: ${dishPersonality}\nSocial Impact: ${socialCreditScore}\nAge: ${dishAge} food years\nConclusion: Still weird.`;
            navigator.clipboard.writeText(analysis);
            alert('Useless analysis copied to clipboard!');
            playSound('success');
          }}
        >
          📋 Export Nonsense
        </button>

        <button 
          className="useless-btn"
          onClick={() => {
            setDishAge(prev => prev + 1);
            playSound('hover');
            setTimeout(() => {
              alert('Congratulations! Your dish is now 1 food year older. This changes nothing.');
            }, 500);
          }}
        >
          ⏰ Age Dish Manually
        </button>
      </div>
    </div>
  );
};

export default UselessFeatures;
