import React, { useState, useEffect, useCallback } from "react";
import MOOD_DATA from "./data";
import MoodDetector from "./components/MoodDetector";
import IngredientScanner from "./components/IngredientScanner";
import SoundManager from "./components/SoundManager";
import UselessFeatures from "./components/UselessFeatures";
import DishSimulator from "./components/DishSimulator";
import ChaosCalculator from "./components/ChaosCalculator";

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function DishCard({ dish, onChef, onFavorite, isFavorite, playSound }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`dish-card ${isHovered ? 'hovered' : ''} ${dish.isUserGenerated ? 'user-generated' : ''}`}
      onMouseEnter={() => {
        setIsHovered(true);
        playSound('hover');
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{color: '#ffffff', backgroundColor: '#2a2a3e'}}
    >
      <img src={dish.img} alt={dish.title} className="dish-img" />
      <div className="dish-body" style={{color: '#ffffff'}}>
        <h3 style={{color: '#ffffff'}}>{dish.title}</h3>
        <p className="desc" style={{color: '#ffffff'}}>{dish.desc}</p>
        
        <div className="dish-stats" style={{color: '#ffffff'}}>
          <span className="chaos-level" style={{color: '#ffffff'}}>Chaos: {dish.chaos}/10</span>
          {dish.cookTime && <span className="cook-time" style={{color: '#ffffff'}}>⏱️ {dish.cookTime}</span>}
          {dish.difficulty && <span className="difficulty" style={{color: '#ffffff'}}>📊 {dish.difficulty}</span>}
        </div>
        
        {dish.tags && (
          <div className="dish-tags" style={{color: '#ffffff'}}>
            {dish.tags.map((tag, idx) => (
              <span key={idx} className="tag" style={{color: '#ffffff', backgroundColor: '#4a4a6e'}}>{tag}</span>
            ))}
          </div>
        )}
        
        <div className="meta">
          <div className="actions">
            <button 
              onClick={() => {
                onChef(dish);
                playSound('chef');
              }}
              className="chef-btn"
            >
              👨‍🍳 Chef Mode
            </button>
            <button
              onClick={() => {
                onFavorite(dish);
                playSound(isFavorite ? 'click' : 'success');
              }}
              className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            >
              {isFavorite ? '❤️' : '🤍'} {isFavorite ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={() => {
                const shareText = `${dish.title} — ${dish.desc} (from Mood Menu)`;
                if (navigator.share) {
                  navigator
                    .share({ text: shareText })
                    .catch(() => navigator.clipboard.writeText(shareText));
                } else {
                  navigator.clipboard.writeText(shareText);
                  alert("Copied to clipboard!");
                }
                playSound('click');
              }}
              className="share-btn"
            >
              📤 Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [moodIndex, setMoodIndex] = useState(0);
  const [currentDish, setCurrentDish] = useState(null);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isTalking, setIsTalking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [showMoodDetector, setShowMoodDetector] = useState(false);
  const [showIngredientScanner, setShowIngredientScanner] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userGeneratedDishes, setUserGeneratedDishes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showUselessFeatures, setShowUselessFeatures] = useState(false);
  const [showDishSimulator, setShowDishSimulator] = useState(false);
  const [showChaosCalculator, setShowChaosCalculator] = useState(false);

  const { playSound } = SoundManager({ soundEnabled });

  useEffect(() => {
    setVoiceSupported("speechSynthesis" in window && "webkitSpeechRecognition" in window === false);
    // Initial dish
    setCurrentDish(randomChoice(MOOD_DATA[0].suggestions));
    
    // Load saved data
    const savedFavorites = localStorage.getItem('moodMenuFavorites');
    const savedUserDishes = localStorage.getItem('moodMenuUserDishes');
    const savedSoundEnabled = localStorage.getItem('moodMenuSoundEnabled');
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedUserDishes) setUserGeneratedDishes(JSON.parse(savedUserDishes));
    if (savedSoundEnabled !== null) setSoundEnabled(JSON.parse(savedSoundEnabled));
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('moodMenuFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('moodMenuUserDishes', JSON.stringify(userGeneratedDishes));
  }, [userGeneratedDishes]);

  useEffect(() => {
    localStorage.setItem('moodMenuSoundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  function pickDishForMood(moodObj) {
    const allDishes = [...moodObj.suggestions, ...userGeneratedDishes];
    const dish = randomChoice(allDishes);
    setCurrentDish(dish);
    setHistory(prev => [dish, ...prev].slice(0, 10));
  }

  function handleSurprise() {
    const moodObj = randomChoice(MOOD_DATA);
    setMoodIndex(MOOD_DATA.findIndex(m => m.id === moodObj.id));
    pickDishForMood(moodObj);
    playSound('surprise');
  }

  function handleMoodDetected(moodId, confidence) {
    const moodIdx = MOOD_DATA.findIndex(m => m.id === moodId);
    if (moodIdx !== -1) {
      setMoodIndex(moodIdx);
      pickDishForMood(MOOD_DATA[moodIdx]);
      playSound('success');
    }
  }

  function handleIngredientsDetected(ingredients, recipe = null) {
    if (recipe) {
      setUserGeneratedDishes(prev => [recipe, ...prev].slice(0, 5));
      setCurrentDish(recipe);
      setHistory(prev => [recipe, ...prev].slice(0, 10));
      playSound('success');
    }
  }

  function toggleFavorite(dish) {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.title === dish.title);
      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.title !== dish.title);
      } else {
        return [dish, ...prev].slice(0, 20); // Max 20 favorites
      }
    });
  }

  function isFavorite(dish) {
    return favorites.some(fav => fav.title === dish.title);
  }

  function chefSpeak(dish) {
    if (!("speechSynthesis" in window)) {
      alert("Chef Mode not supported in this browser.");
      return;
    }
    const utter = new SpeechSynthesisUtterance();
    utter.text = `Presenting: ${dish.title}. ${dish.desc}. Recommended chaos level ${dish.chaos} out of ten. Bon appétit!`;
    utter.rate = 0.95;
    utter.pitch = 1.1;
    utter.onstart = () => setIsTalking(true);
    utter.onend = () => setIsTalking(false);
    // choose a voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length) {
      utter.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  function handleMoodChange(e) {
    const idx = Number(e.target.value);
    setMoodIndex(idx);
    pickDishForMood(MOOD_DATA[idx]);
    playSound('click');
  }

  return (
    <div className="app" style={{color: '#ffffff', backgroundColor: '#1a1a2e'}}>
      <header style={{color: '#ffffff'}}>
        <div className="header-main" style={{color: '#ffffff'}}>
          <h1 style={{color: '#ffffff'}}>Mood Menu <span className="mini">🍽️</span></h1>
          <p className="tag" style={{color: '#ffffff'}}>Feeling weird? Eat weirder.</p>
        </div>
        
        <div className="header-controls">
          <button
            className={`toggle-btn ${soundEnabled ? 'active' : ''}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            title="Toggle sound effects"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          
          <button
            className={`toggle-btn ${showMoodDetector ? 'active' : ''}`}
            onClick={() => {
              setShowMoodDetector(!showMoodDetector);
              playSound('click');
            }}
            title="AI Mood Detection"
          >
            📷
          </button>
          
          <button
            className={`toggle-btn ${showIngredientScanner ? 'active' : ''}`}
            onClick={() => {
              setShowIngredientScanner(!showIngredientScanner);
              playSound('click');
            }}
            title="Ingredient Scanner"
          >
            🔍
          </button>
          
          <button
            className={`toggle-btn ${showFavorites ? 'active' : ''}`}
            onClick={() => {
              setShowFavorites(!showFavorites);
              playSound('click');
            }}
            title="View Favorites"
          >
            ❤️ {favorites.length}
          </button>
          
          <button
            className={`toggle-btn ${showUselessFeatures ? 'active' : ''}`}
            onClick={() => {
              setShowUselessFeatures(!showUselessFeatures);
              playSound('click');
            }}
            title="Useless Analysis"
          >
            🤖
          </button>
          
          <button
            className={`toggle-btn ${showDishSimulator ? 'active' : ''}`}
            onClick={() => {
              setShowDishSimulator(!showDishSimulator);
              playSound('click');
            }}
            title="Virtual Eating Simulator"
          >
            🍽️
          </button>
          
          <button
            className={`toggle-btn ${showChaosCalculator ? 'active' : ''}`}
            onClick={() => {
              setShowChaosCalculator(!showChaosCalculator);
              playSound('click');
            }}
            title="Chaos Calculator"
          >
            🧮
          </button>
        </div>
      </header>

      <main>
        {showMoodDetector && (
          <section className="mood-detection">
            <MoodDetector 
              onMoodDetected={handleMoodDetected}
              isActive={showMoodDetector}
            />
          </section>
        )}
        
        {showIngredientScanner && (
          <section className="ingredient-scanning">
            <IngredientScanner 
              onIngredientsDetected={handleIngredientsDetected}
            />
          </section>
        )}
        
        {showChaosCalculator && (
          <section className="chaos-calculation">
            <ChaosCalculator playSound={playSound} />
          </section>
        )}

        <section className="controls" style={{color: '#ffffff'}}>
          <label className="mood-select" style={{color: '#ffffff'}}>
            Pick your mood:
            <select 
              value={moodIndex} 
              onChange={handleMoodChange}
              style={{
                color: '#ffffff',
                backgroundColor: '#2a2a3e',
                border: '1px solid #4a4a6e',
                padding: '8px'
              }}
            >
              {MOOD_DATA.map((m, idx) => (
                <option 
                  key={m.id} 
                  value={idx}
                  style={{
                    color: '#ffffff',
                    backgroundColor: '#2a2a3e'
                  }}
                >
                  {m.emoji} {m.mood}
                </option>
              ))}
            </select>
          </label>

          <div className="buttons">
            <button 
              onClick={() => {
                pickDishForMood(MOOD_DATA[moodIndex]);
                playSound('click');
              }}
            >
              🎲 Give me a dish
            </button>
            <button onClick={handleSurprise} className="surprise">
              ✨ Surprise Me
            </button>
            <button
              onClick={() => {
                if (currentDish) chefSpeak(currentDish);
              }}
              disabled={!currentDish}
              className="chef-mode-btn"
            >
              {isTalking ? "🗣️ Chef is talking..." : voiceSupported ? "👨‍🍳 Chef Mode" : "👨‍🍳 Chef Mode (may not be supported)"}
            </button>
          </div>
        </section>

        {showFavorites && favorites.length > 0 && (
          <section className="favorites-section">
            <h3>❤️ Your Favorite Chaos</h3>
            <div className="favorites-grid">
              {favorites.map((dish, idx) => (
                <DishCard 
                  key={idx} 
                  dish={dish} 
                  onChef={chefSpeak}
                  onFavorite={toggleFavorite}
                  isFavorite={true}
                  playSound={playSound}
                />
              ))}
            </div>
          </section>
        )}

        <section className="result" style={{color: '#ffffff'}}>
          {currentDish ? (
            <div className="dish-display" style={{color: '#ffffff'}}>
              <DishCard 
                dish={currentDish} 
                onChef={chefSpeak}
                onFavorite={toggleFavorite}
                isFavorite={isFavorite(currentDish)}
                playSound={playSound}
              />
              
              {showUselessFeatures && (
                <UselessFeatures 
                  currentDish={currentDish}
                  playSound={playSound}
                />
              )}
              
              {showDishSimulator && (
                <DishSimulator 
                  dish={currentDish}
                  playSound={playSound}
                />
              )}
            </div>
          ) : (
            <div className="placeholder">Select a mood to see its special dish!</div>
          )}
        </section>

        <section className="extras">
          <div className="extras-header">
            <h3>🕐 Dish History</h3>
            {userGeneratedDishes.length > 0 && (
              <button 
                className="clear-btn"
                onClick={() => {
                  setUserGeneratedDishes([]);
                  playSound('click');
                }}
              >
                Clear AI Dishes
              </button>
            )}
          </div>
          
          <div className="history">
            {history.length === 0 && <div className="hint">No dishes yet — try Surprise Me!</div>}
            {history.map((d, i) => (
              <div 
                className={`hist-item ${d.isUserGenerated ? 'user-generated' : ''}`} 
                key={i}
                onClick={() => {
                  setCurrentDish(d);
                  playSound('click');
                }}
              >
                <img src={d.img} alt={d.title} />
                <div>
                  <strong>{d.title}</strong>
                  <div className="small">{d.desc}</div>
                  {d.isUserGenerated && <span className="ai-badge">🤖 AI Generated</span>}
                </div>
              </div>
            ))}
          </div>
          
          <div className="game">
            <h4>Would You Eat This? (Quick Poll)</h4>
            <p>Click Yes or No — votes are local (just for demo)</p>
            <VoteWidget dish={currentDish} playSound={playSound} />
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <small>Made for Useless Projects — built in <strong>18 hours</strong> (demo mode).</small>
          <div className="footer-stats">
            <span>🍽️ {history.length} dishes tried</span>
            <span>❤️ {favorites.length} favorites</span>
            <span>🤖 {userGeneratedDishes.length} AI creations</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Enhanced vote widget with sound effects
function VoteWidget({ dish, playSound }) {
  const [yes, setYes] = useState(0);
  const [no, setNo] = useState(0);
  const [userVote, setUserVote] = useState(null);
  
  useEffect(() => {
    // reset when dish changes (so votes apply to dish)
    setYes(0);
    setNo(0);
    setUserVote(null);
  }, [dish]);

  if (!dish) return <div className="small">Pick a dish to start voting!</div>;

  const handleVote = (vote) => {
    if (userVote) return; // Prevent double voting
    
    if (vote === 'yes') {
      setYes(y => y + 1);
      setUserVote('yes');
      playSound('success');
    } else {
      setNo(n => n + 1);
      setUserVote('no');
      playSound('click');
    }
  };

  const totalVotes = yes + no;
  const yesPercentage = totalVotes === 0 ? 50 : (yes / totalVotes) * 100;

  return (
    <div className="vote-widget">
      <div className="vote-buttons">
        <button 
          onClick={() => handleVote('yes')}
          className={`vote-btn yes ${userVote === 'yes' ? 'voted' : ''}`}
          disabled={userVote !== null}
        >
          Yes 👍 ({yes})
        </button>
        <button 
          onClick={() => handleVote('no')}
          className={`vote-btn no ${userVote === 'no' ? 'voted' : ''}`}
          disabled={userVote !== null}
        >
          No 👎 ({no})
        </button>
      </div>
      <div className="vote-bar">
        <div
          className="yes-bar"
          style={{ width: `${yesPercentage}%` }}
        />
        <div className="vote-percentage">
          {totalVotes > 0 && `${Math.round(yesPercentage)}% yes`}
        </div>
      </div>
      {userVote && (
        <div className="vote-thanks">
          Thanks for voting! {userVote === 'yes' ? '🎉' : '😅'}
        </div>
      )}
    </div>
  );
}
