// mood -> list of dish suggestions (image, title, description, chaos, spice)
const MOOD_DATA = [
  {
    id: "tired_dramatic",
    mood: "Tired but dramatic",
    emoji: "😵‍💫",
    suggestions: [
      {
        title: "Maggi à la Chocolate",
        desc: "Instant noodles drenched in chocolate sauce. Comfort meets dramatic flair.",
        img: "https://images.unsplash.com/photo-1604908177522-3a3a2f3a07b1?auto=format&fit=crop&w=800&q=60",
        chaos: 8
      },
      {
        title: "Sleepy Caramel Toast",
        desc: "Buttered toast with caramel drizzle and a sprinkle of instant coffee.",
        img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=60",
        chaos: 6
      },
      {
        title: "Cotton Candy Soup",
        desc: "Hot chicken broth with cotton candy dissolving into sweet confusion.",
        img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=60",
        chaos: 9
      },
      {
        title: "Gummy Bear Omelette",
        desc: "Fluffy eggs with melted gummy bears creating fruity pockets of weirdness.",
        img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=60",
        chaos: 7
      },
      {
        title: "Dorito Crusted Fish Fingers",
        desc: "Fish sticks coated in crushed Doritos because why not double the orange?",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60",
        chaos: 6
      }
    ]
  },
  {
    id: "productively_lazy",
    mood: "Productively lazy",
    emoji: "🥱",
    suggestions: [
      {
        title: "Microwave Pizza With Honey",
        desc: "Microwaved pizza slice + honey. Efficient & questionable.",
        img: "https://images.unsplash.com/photo-1548365328-8a8e3c2fa56f?auto=format&fit=crop&w=800&q=60",
        chaos: 7
      },
      {
        title: "Cereal & Masala Powder",
        desc: "Cereal, milk, and a dash of masala for *energy* (maybe).",
        img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=60",
        chaos: 5
      },
      {
        title: "Instant Ramen Smoothie",
        desc: "Blend cooked ramen with fruit juice. Liquid lunch taken literally.",
        img: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=800&q=60",
        chaos: 8
      },
      {
        title: "Cookie Dough Burrito",
        desc: "Raw cookie dough wrapped in a tortilla with chocolate chips.",
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60",
        chaos: 6
      },
      {
        title: "Energy Drink Jello Shots",
        desc: "Non-alcoholic jello made with energy drinks. Bouncy caffeine delivery.",
        img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=60",
        chaos: 7
      },
      {
        title: "Pickle Juice Ice Cubes",
        desc: "Frozen pickle juice cubes in your regular drink. Salty surprise every sip.",
        img: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=800&q=60",
        chaos: 5
      }
    ]
  },
  {
    id: "angry_hungry",
    mood: "Angry but hungry",
    emoji: "😤",
    suggestions: [
      {
        title: "Spicy Chocolate Curry",
        desc: "Chocolate + curry powder over rice — rage on a plate.",
        img: "https://images.unsplash.com/photo-1604908177563-5e1c7b7c3d7f?auto=format&fit=crop&w=800&q=60",
        chaos: 9
      },
      {
        title: "Wasabi Ice Cream Sandwich",
        desc: "Sweet, cold, and aggressively nasal.",
        img: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=60",
        chaos: 10
      },
      {
        title: "Ghost Pepper Mac and Cheese",
        desc: "Creamy comfort food with enough heat to make you question life choices.",
        img: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=60",
        chaos: 10
      },
      {
        title: "Sriracha Cereal Bowl",
        desc: "Your favorite breakfast cereal swimming in sriracha instead of milk.",
        img: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=800&q=60",
        chaos: 8
      },
      {
        title: "Jalapeño Cotton Candy",
        desc: "Spun sugar infused with jalapeño extract. Sweet burn in every bite.",
        img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=60",
        chaos: 7
      },
      {
        title: "Carolina Reaper Yogurt",
        desc: "Creamy yogurt meets the world's hottest pepper. Cool down? Think again.",
        img: "https://images.unsplash.com/photo-1571212515416-eb2c0934c87b?auto=format&fit=crop&w=800&q=60",
        chaos: 10
      }
    ]
  },
  {
    id: "peaceful_chaotic",
    mood: "Peacefully chaotic",
    emoji: "😌",
    suggestions: [
      {
        title: "Green Tea Jelly with Samosa Crumbs",
        desc: "Serene tea flavors with crunchy chaos.",
        img: "https://images.unsplash.com/photo-1559628235-ec3d9f29a1d8?auto=format&fit=crop&w=800&q=60",
        chaos: 6
      },
      {
        title: "Cucumber Ice Cream Toast",
        desc: "Cool cucumber notes on hot toast. Surprisingly balanced?",
        img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=60",
        chaos: 4
      },
      {
        title: "Lavender Fish Tacos",
        desc: "Zen vibes meet Mexican cuisine with floral fish tacos that shouldn't work but do.",
        img: "https://images.unsplash.com/photo-1565299585323-38174c8a9977?auto=format&fit=crop&w=800&q=60",
        chaos: 5
      },
      {
        title: "Matcha Spaghetti",
        desc: "Green tea powder mixed into pasta for an oddly calming carb experience.",
        img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=60",
        chaos: 6
      },
      {
        title: "Rose Water Meatballs",
        desc: "Traditional meatballs infused with rose water. Floral protein confusion.",
        img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=60",
        chaos: 7
      },
      {
        title: "Chamomile Fried Rice",
        desc: "Peaceful chamomile tea brewed rice with vegetables. Sleep-inducing stir fry.",
        img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=60",
        chaos: 4
      }
    ]
  },
  {
    id: "single_and_starving",
    mood: "Single and starving",
    emoji: "🥹",
    suggestions: [
      {
        title: "Ramen Mug Cake",
        desc: "Noodles + cake in one mug. For emotional efficiency.",
        img: "https://images.unsplash.com/photo-1604908177554-c5e0ef8f4b8f?auto=format&fit=crop&w=800&q=60",
        chaos: 7
      },
      {
        title: "Chocolate Butter Chapati",
        desc: "Wrap your sadness in butter and cocoa.",
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=60",
        chaos: 6
      },
      {
        title: "Ice Cream Sandwich Grilled Cheese",
        desc: "Two slices of bread with ice cream in between, grilled like a sandwich. Hot, cold, confused.",
        img: "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=800&q=60",
        chaos: 8
      },
      {
        title: "Cereal Milk Cocktail",
        desc: "Non-alcoholic drink made from leftover cereal milk with fruit garnish. Childhood in a glass.",
        img: "https://images.unsplash.com/photo-1544737151156-6e4737518e38?auto=format&fit=crop&w=800&q=60",
        chaos: 5
      },
      {
        title: "Marshmallow Sushi",
        desc: "Rice crispy treats shaped like sushi with fruit leather 'fish'. Sweet deception.",
        img: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=800&q=60",
        chaos: 6
      },
      {
        title: "Peanut Butter Pickle Sandwich",
        desc: "The classic weird combo that somehow works. Salty, sweet, crunchy confusion.",
        img: "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=800&q=60",
        chaos: 7
      }
    ]
  },
  {
    id: "chaotically_creative",
    mood: "Chaotically creative",
    emoji: "🎨",
    suggestions: [
      {
        title: "Paint Palette Pancakes",
        desc: "Rainbow pancakes with edible paint made from natural food coloring. Art you can eat.",
        img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=60",
        chaos: 6
      },
      {
        title: "Backwards Burger",
        desc: "Burger with the bun on the inside and meat on the outside. Logic not included.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60",
        chaos: 8
      },
      {
        title: "Alphabet Soup Pizza",
        desc: "Pizza topped with alphabet pasta spelling random words. Edible literature.",
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=60",
        chaos: 7
      }
    ]
  },
  {
    id: "nostalgically_confused",
    mood: "Nostalgically confused",
    emoji: "🤪",
    suggestions: [
      {
        title: "Adult Baby Food Gourmet",
        desc: "Pureed gourmet meals served in baby food jars. Childhood regression meets fine dining.",
        img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=60",
        chaos: 9
      },
      {
        title: "Cereal Bar Cocktail",
        desc: "Liquid granola bar mixed with milk. Breakfast drink confusion.",
        img: "https://images.unsplash.com/photo-1544737151156-6e4737518e38?auto=format&fit=crop&w=800&q=60",
        chaos: 5
      },
      {
        title: "Lunchable Sushi",
        desc: "Sushi made with lunchable crackers, cheese, and ham. Corporate childhood meets Japan.",
        img: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=800&q=60",
        chaos: 8
      }
    ]
  },
  {
    id: "mysteriously_adventurous",
    mood: "Mysteriously adventurous",
    emoji: "🕵️",
    suggestions: [
      {
        title: "Black Garlic Ice Cream",
        desc: "Dark, mysterious ice cream that tastes like sweet soy sauce. Trust the process.",
        img: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=60",
        chaos: 7
      },
      {
        title: "Edible Dirt Cake",
        desc: "Chocolate cake that looks and feels like actual dirt with gummy worms. Garden surprise.",
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60",
        chaos: 6
      },
      {
        title: "Invisible Sandwich",
        desc: "Clear gelatin sheets with hidden ingredients suspended inside. See-through confusion.",
        img: "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=800&q=60",
        chaos: 9
      }
    ]
  },
  {
    id: "rebelliously_hungry",
    mood: "Rebelliously hungry",
    emoji: "😈",
    suggestions: [
      {
        title: "Breakfast Pizza for Dinner",
        desc: "Pizza with eggs, bacon, and maple syrup at 8 PM. Rules are meant to be broken.",
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=60",
        chaos: 5
      },
      {
        title: "Ice Cream Soup",
        desc: "Melted ice cream served hot as soup with cookie croutons. Dessert anarchy.",
        img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=60",
        chaos: 8
      },
      {
        title: "Spaghetti and Meatball Sandwich",
        desc: "Entire spaghetti dinner crammed between two slices of bread. Carb rebellion.",
        img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=60",
        chaos: 7
      },
      {
        title: "Backwards Cake",
        desc: "Cake that looks like a savory dish but tastes sweet. Visual confusion guaranteed.",
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60",
        chaos: 9
      }
    ]
  }
];

export default MOOD_DATA;
