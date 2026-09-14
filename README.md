# 🎮 AIM TRAINER - Professional Gaming Aim Training Application

A high-performance React-based aim training application built with Vite. Designed to help gamers improve their reflexes, accuracy, and aiming skills through multiple game modes and comprehensive statistics tracking.

## ✨ Features

### 🎯 Four Unique Game Modes

1. **REACTION TEST** ⚡
   - Test your reflexes with instant target appearances
   - Measures average reaction time in milliseconds
   - Progressive difficulty settings
   - 10 rounds per session

2. **PRECISION** 🎯
   - Improve your accuracy with careful aiming
   - Real-time accuracy tracking
   - Miss detection system
   - Customizable training duration

3. **SPEED CHALLENGE** 🚀
   - Beat the clock in timed challenges
   - Click as many targets as possible in 30 seconds
   - Real-time score tracking
   - Targets/second performance metric

4. **GRIDSHOT** 📊
   - Master complex target patterns
   - Click targets in sequential order
   - 4x4 grid of targets
   - Completion time tracking

### 📊 Comprehensive Statistics

- Track all game sessions with timestamps
- View performance metrics by game mode
- Personal best records
- Session history with detailed stats
- Reset statistics option
- Local storage persistence

### ⚙️ Customizable Settings

- **Training Duration**: 10-300 seconds (default: 30s)
- **Target Size**: 15-60 pixels adjustable difficulty
- **Target Speed**: 0.5x-2x multiplier for game speed
- **Audio**: Toggle sound effects on/off
- **Music**: Background music control
- **Theme**: Dark gaming theme optimized for eye comfort

### 📚 Training Guide

- **Daily Routine**: Structured training recommendations
- **Pro Tips**: Expert advice for improving your aim
- **Progression Levels**: Beginner → Intermediate → Advanced
- **Training Milestones**: Target metrics for each level

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FinnLukas121/aim-trainer.git
cd aim-trainer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be generated in the `dist/` directory.

## 🎮 How to Play

### Home Page
- Overview of all game modes
- Quick access to different features
- Display of featured capabilities

### Playing a Game
1. Select a game mode from the PLAY section
2. Review the mode description and mechanics
3. Start with the 3-second countdown
4. Follow the in-game instructions
5. View detailed results upon completion

### Tracking Progress
- Visit STATS section to view all your records
- Filter by game mode
- Compare current performance with personal bests
- Review complete session history

### Optimization Tips
- Adjust target size in Settings for your preference
- Modify game speed to match your training goals
- Use audio cues for better timing feedback
- Train consistently for skill development

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite (ultra-fast build times)
- **Styling**: Pure CSS with modern CSS Grid & Flexbox
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Storage**: Browser LocalStorage for statistics persistence
- **Audio**: Web Audio API for sound effects

## 📁 Project Structure

```
aim-trainer/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   └── GameResults.jsx
│   ├── games/
│   │   ├── ReactionGame.jsx
│   │   ├── PrecisionGame.jsx
│   │   ├── SpeedGame.jsx
│   │   └── GridshotGame.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Play.jsx
│   │   ├── Training.jsx
│   │   ├── Stats.jsx
│   │   └── Settings.jsx
│   ├── styles/
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── Sidebar.css
│   │   ├── pages/
│   │   ├── games/
│   │   └── components/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 UI/UX Features

- **Dark Gaming Theme**: Eye-friendly dark interface optimized for extended play
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Polished transitions and visual feedback
- **Accessibility**: Clear visual hierarchy and intuitive navigation
- **Performance**: Optimized rendering with minimal re-renders
- **Visual Feedback**: Real-time score updates and progress indicators

## 📊 Performance Metrics

The app tracks and displays:
- Average reaction time (ms)
- Accuracy percentage
- Hits and misses count
- Targets per second
- Session completion time
- Personal best achievements

## 🔄 Game Statistics

All statistics are automatically saved to browser LocalStorage:
- Game mode (Reaction, Precision, Speed, Gridshot)
- Score achieved
- Performance metrics (accuracy, reaction time, etc.)
- Timestamp of session
- Personal best tracking

## 💡 Tips for Best Performance

1. **Ergonomics**: Maintain proper posture and arm position
2. **Mouse Settings**: Use consistent mouse sensitivity
3. **Environment**: Train in good lighting with minimal distractions
4. **Training Schedule**: Regular training (daily) yields better results
5. **Progression**: Start with larger targets, gradually reduce size
6. **Breaks**: Take short breaks to maintain focus

## 🐛 Known Limitations

- Statistics are stored locally in browser (cleared if cache is cleared)
- Audio context requires user interaction to start
- Some older browsers may not support full Web Audio API

## 🔮 Future Enhancements

- [ ] Cloud synchronization for cross-device tracking
- [ ] Multiplayer competitive modes
- [ ] Advanced analytics dashboard
- [ ] Custom training programs
- [ ] Global leaderboards
- [ ] Achievement system with badges
- [ ] Video replay of sessions
- [ ] More game mode variations

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**FinnLukas121**
- GitHub: [@FinnLukas121](https://github.com/FinnLukas121)

## 🙏 Acknowledgments

- Inspired by popular gaming aim trainers (Aim Lab, Valorant Training Range)
- React community for excellent documentation
- Vite team for lightning-fast build tools

## 📧 Support

For issues, feature requests, or questions, please:
1. Check existing [Issues](https://github.com/FinnLukas121/aim-trainer/issues)
2. Create a new issue with detailed information
3. Include screenshots or error logs if applicable

---

**Happy Training! 🎮 Master Your Aim. Improve Your Skills.**
