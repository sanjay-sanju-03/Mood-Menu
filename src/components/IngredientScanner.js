import React, { useState, useRef } from 'react';

const IngredientScanner = ({ onIngredientsDetected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const fileInputRef = useRef(null);

  // Mock ingredient detection (in real app, you'd use an AI service)
  const mockDetectIngredients = (imageFile) => {
    // Simulate API call delay
    setTimeout(() => {
      const mockIngredients = [
        'tomatoes', 'onions', 'garlic', 'cheese', 'bread', 
        'eggs', 'milk', 'rice', 'chicken', 'pasta',
        'carrots', 'potatoes', 'spinach', 'bell peppers'
      ];
      
      // Randomly select 3-6 ingredients
      const numIngredients = Math.floor(Math.random() * 4) + 3;
      const selected = [];
      
      for (let i = 0; i < numIngredients; i++) {
        const ingredient = mockIngredients[Math.floor(Math.random() * mockIngredients.length)];
        if (!selected.includes(ingredient)) {
          selected.push(ingredient);
        }
      }
      
      setDetectedIngredients(selected);
      setIsScanning(false);
      onIngredientsDetected(selected);
    }, 2000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setIsScanning(true);
        setDetectedIngredients([]);
        mockDetectIngredients(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateWeirdRecipe = () => {
    if (detectedIngredients.length === 0) return;
    
    const weirdCombos = [
      'Blend with ice cream and top with crushed crackers',
      'Wrap in chocolate and serve with pickle juice',
      'Deep fry and coat in honey and chili powder',
      'Mix with peanut butter and freeze overnight',
      'Bake with marshmallows and add hot sauce',
      'Stuff into a waffle cone with whipped cream',
      'Marinate in coffee and serve with cotton candy'
    ];
    
    const combo = weirdCombos[Math.floor(Math.random() * weirdCombos.length)];
    const ingredients = detectedIngredients.join(', ');
    
    return {
      title: `Chaotic ${detectedIngredients[0].charAt(0).toUpperCase() + detectedIngredients[0].slice(1)} Fusion`,
      desc: `Take your ${ingredients} and ${combo}. Chaos level: ${Math.floor(Math.random() * 3) + 8}/10`,
      img: uploadedImage,
      chaos: Math.floor(Math.random() * 3) + 8,
      ingredients: detectedIngredients,
      isUserGenerated: true
    };
  };

  return (
    <div className="ingredient-scanner">
      <div className="scanner-header">
        <h4>🔍 Ingredient Scanner</h4>
        <p>Upload a photo of your ingredients and we'll create chaos!</p>
      </div>
      
      <div className="upload-area">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        
        {!uploadedImage ? (
          <button 
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            📸 Scan Ingredients
          </button>
        ) : (
          <div className="scan-result">
            <img src={uploadedImage} alt="Uploaded ingredients" className="uploaded-img" />
            
            {isScanning && (
              <div className="scanning-overlay">
                <div className="scanner-line"></div>
                <p>🤖 AI analyzing ingredients...</p>
              </div>
            )}
            
            {detectedIngredients.length > 0 && (
              <div className="ingredients-result">
                <h5>Detected Ingredients:</h5>
                <div className="ingredient-tags">
                  {detectedIngredients.map((ingredient, idx) => (
                    <span key={idx} className="ingredient-tag">
                      {ingredient}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="generate-recipe-btn"
                  onClick={() => {
                    const recipe = generateWeirdRecipe();
                    onIngredientsDetected(detectedIngredients, recipe);
                  }}
                >
                  🎲 Generate Weird Recipe
                </button>
              </div>
            )}
            
            <button 
              className="rescan-btn"
              onClick={() => {
                setUploadedImage(null);
                setDetectedIngredients([]);
                setIsScanning(false);
              }}
            >
              Scan New Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientScanner;
