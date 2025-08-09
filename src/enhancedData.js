// Enhanced mood data with more variety and features
const MOOD_DATA = [
  {
    id: "tired_dramatic",
    mood: "Tired but dramatic",
    emoji: "😵‍💫",
    color: "#ff6b6b",
    suggestions: [
      {
        title: "Maggi à la Chocolate",
        desc: "Instant noodles drenched in chocolate sauce. Comfort meets dramatic flair.",
        img: "https://images.unsplash.com/photo-1604908177522-3a3a2f3a07b1?auto=format&fit=crop&w=800&q=60",
        chaos: 8,
        cookTime: "5 mins",
        difficulty: "Easy",
        tags: ["comfort", "sweet", "quick"]
      },
      {
        title: "Sleepy Caramel Toast",
        desc: "Buttered toast with caramel drizzle and a sprinkle of instant coffee.",
        img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=60",
        chaos: 6,
        cookTime: "3 mins",
        difficulty: "Easy",
        tags: ["sweet", "coffee", "breakfast"]
      },
      {
        title: "Midnight Pickle Pancakes",
        desc: "Fluffy pancakes with pickle juice syrup. Sweet dreams are made of these.",
        img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=60",
        chaos: 9,
        cookTime: "15 mins",
        difficulty: "Medium",
        tags: ["savory", "sweet", "midnight"]
      }
    ]
  },
  {
    id: "productively_lazy",
    mood: "Productively lazy",
    emoji: "🥱",
    color: "#4ecdc4",
    suggestions: [
      {
        title: "Microwave Pizza With Honey",
        desc: "Microwaved pizza slice + honey. Efficient & questionable.",
        img: "https://images.unsplash.com/photo-1548365328-8a8e3c2fa56f?auto=format&fit=crop&w=800&q=60",
        chaos: 7,
        cookTime: "2 mins",
        difficulty: "Easy",
        tags: ["lazy", "sweet", "microwave"]
      },
      {
        title: "Cereal & Masala Powder",
        desc: "Cereal, milk, and a dash of masala for *energy* (maybe).",
        img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=60",
        chaos: 5,
        cookTime: "1 min",
        difficulty: "Easy",
        tags: ["spicy", "breakfast", "energy"]
      },
      {
        title: "Lazy Sushi Burrito",
        desc: "All sushi ingredients wrapped in a tortilla. Fusion without the fuss.",
        img: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=60",
        chaos: 6,
        cookTime: "10 mins",
        difficulty: "Medium",
        tags: ["fusion", "lazy", "portable"]
      }
    ]
  },
  {
    id: "angry_hungry",
    mood: "Angry but hungry",
    emoji: "😤",
    color: "#ff4757",
    suggestions: [
      {
        title: "Spicy Chocolate Curry",
        desc: "Chocolate + curry powder over rice — rage on a plate.",
        img: "https://images.unsplash.com/photo-1604908177563-5e1c7b7c3d7f?auto=format&fit=crop&w=800&q=60",
        chaos: 9,
        cookTime: "20 mins",
        difficulty: "Hard",
        tags: ["spicy", "sweet", "rice"]
      },
      {
        title: "Wasabi Ice Cream Sandwich",
        desc: "Sweet, cold, and aggressively nasal.",
        img: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=60",
        chaos: 10,
        cookTime: "5 mins",
        difficulty: "Easy",
        tags: ["spicy", "cold", "aggressive"]
      },
      {
        title: "Rage Ramen Bomb",
        desc: "Instant ramen with hot sauce, cheese, and crushed energy drink. Anger fuel.",
        img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=60",
        chaos: 8,
        cookTime: "7 mins",
        difficulty: "Easy",
        tags: ["spicy", "energy", "intense"]
      }
    ]
  },
  {
    id: "peaceful_chaotic",
    mood: "Peacefully chaotic",
    emoji: "😌",
    color: "#a8e6cf",
    suggestions: [
      {
        title: "Green Tea Jelly with Samosa Crumbs",
        desc: "Serene tea flavors with crunchy chaos.",
        img: "https://images.unsplash.com/photo-1559628235-ec3d9f29a1d8?auto=format&fit=crop&w=800&q=60",
        chaos: 6,
        cookTime: "30 mins",
        difficulty: "Medium",
        tags: ["zen", "crunchy", "tea"]
      },
      {
        title: "Cucumber Ice Cream Toast",
        desc: "Cool cucumber notes on hot toast. Surprisingly balanced?",
        img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=60",
        chaos: 4,
        cookTime: "5 mins",
        difficulty: "Easy",
        tags: ["cool", "balanced", "fresh"]
      },
      {
        title: "Meditation Miso Milkshake",
        desc: "Umami meets creamy in this surprisingly harmonious blend.",
        img: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?auto=format&fit=crop&w=800&q=60",
        chaos: 7,
        cookTime: "10 mins",
        difficulty: "Medium",
        tags: ["umami", "creamy", "zen"]
      }
    ]
  },
  {
    id: "single_and_starving",
    mood: "Single and starving",
    emoji: "🥹",
    color: "#ffa726",
    suggestions: [
      {
        title: "Ramen Mug Cake",
        desc: "Noodles + cake in one mug. For emotional efficiency.",
        img: "https://images.unsplash.com/photo-1604908177554-c5e0ef8f4b8f?auto=format&fit=crop&w=800&q=60",
        chaos: 7,
        cookTime: "8 mins",
        difficulty: "Easy",
        tags: ["comfort", "mug", "emotional"]
      },
      {
        title: "Chocolate Butter Chapati",
        desc: "Wrap your sadness in butter and cocoa.",
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=60",
        chaos: 6,
        cookTime: "10 mins",
        difficulty: "Easy",
        tags: ["comfort", "sweet", "wrap"]
      },
      {
        title: "Loneliness Lasagna Cup",
        desc: "All the layers of lasagna in a single-serve cup. Because you're worth it.",
        img: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=800&q=60",
        chaos: 5,
        cookTime: "12 mins",
        difficulty: "Medium",
        tags: ["comfort", "cheesy", "single-serve"]
      }
    ]
  },
  {
    id: "anxious_excited",
    mood: "Anxiously excited",
    emoji: "🤯",
    color: "#7b68ee",
    suggestions: [
      {
        title: "Pop Rock Pasta",
        desc: "Carbonara with pop rocks. Every bite is a surprise party in your mouth.",
        img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=60",
        chaos: 8,
        cookTime: "15 mins",
        difficulty: "Medium",
        tags: ["surprising", "creamy", "explosive"]
      },
      {
        title: "Jittery Java Jello",
        desc: "Coffee-flavored jello with energy drink bubbles. Maximum anxiety fuel.",
        img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=60",
        chaos: 9,
        cookTime: "4 hours",
        difficulty: "Hard",
        tags: ["coffee", "wobbly", "energy"]
      }
    ]
  },
  {
    id: "nostalgic_weird",
    mood: "Nostalgically weird",
    emoji: "🥴",
    color: "#ff8a80",
    suggestions: [
      {
        title: "Childhood Cereal Sushi",
        desc: "Rice crispy treats shaped like sushi with fruit leather 'fish'.",
        img: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=800&q=60",
        chaos: 6,
        cookTime: "25 mins",
        difficulty: "Medium",
        tags: ["nostalgic", "creative", "sweet"]
      },
      {
        title: "Memory Lane Meatloaf",
        desc: "Meatloaf made with crushed graham crackers and a ketchup-marshmallow glaze.",
        img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=60",
        chaos: 7,
        cookTime: "45 mins",
        difficulty: "Hard",
        tags: ["nostalgic", "savory", "sweet"]
      }
    ]
  }
];

export default MOOD_DATA;
