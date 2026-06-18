# MATCH UP! 🎴

A premium, responsive, and dynamic card matching memory game built with a modern glassmorphic interface. Challenge your memory and speed across multiple card decks and custom visual backdrops.

## ✨ Features

- **Dynamic Card Decks:** Toggle between different card themes on the fly:
  - 🗼 **Japan** (Scenic and cultural cards)
  - 🎨 **Mosaics** (Intricate geometric patterns)
  - 🐶 **Dogs** (Adorable canine companions)
- **Custom Background Selector:** Switch the application backdrop instantly to suit your preference:
  - 🌋 Mt Fuji
  - 🌌 Neon
  - 🌾 Field
  - 🌊 Teal
  - 🎏 Koy
- **Premium Glassmorphic Design:** Renders a sleek, high-fidelity user interface utilizing frosted glass panels, vibrant linear gradients, and interactive hover scales.
- **Smart Scoring System:** Points are dynamically calculated based on how quickly you make successful matches:

  - *Incorrect matches incur a penalty.

- **Responsive Layout:** Automatically scales elements to maximize screen real estate and prevent scrolling on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Structure:** [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) (Semantic layouts)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (CDN-based spacing & utilities) + [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) (Custom variables, glassmorphism filters, card flip transitions)
- **Logic:** Vanilla [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (Dynamic DOM generation, Fischer-Yates shuffler, game loop logic)

---

## 📂 Project Structure

```text
MATCH-UP-GAME/
├── Index.html      # Main application layout and Tailwind setup
├── styles.css      # Custom styling tokens, card transitions, and glass effects
├── script.js       # Game loop logic, deck configurations, and timer handlers
├── README.md       # Project documentation
└── assets/         # Asset directories
    ├── backCard.jpg
    ├── bg/         # Background wallpapers
    └── cards/      # Card deck images (Japan, Mosaics, Dogs)
```

---

## 🚀 How to Run Locally

Since the game is built entirely using client-side technologies, it runs directly from your local filesystem with no compilation or web server required.

1. Clone or download the repository.
2. Open the directory containing the code files.
3. Double-click or open [Index.html]directly in any modern web browser (e.g., Google Chrome, Firefox, Microsoft Edge, Safari).
4. Select your preferred deck and background, hit **Start**, and have fun!
