import { useState, useEffect } from 'react';

const BirthdaySurprise = () => {
  const [showCake, setShowCake] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer1 = setTimeout(() => setShowCake(true), 800);
    const timer2 = setTimeout(() => setShowMessage(true), 2000);
    const timer3 = setTimeout(() => setShowBalloons(true), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const createConfetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a55eea', '#26de81', '#fd79a8', '#ff9ff3', '#54a0ff'];
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1000;
    `;

    for (let i = 0; i < 80; i++) {
      const confettiPiece = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 6;
      const startX = Math.random() * window.innerWidth;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 1;

      confettiPiece.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${startX}px;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        animation: confettiFall ${duration}s ${delay}s ease-out forwards;
        transform: rotate(${Math.random() * 360}deg);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      `;

      confettiContainer.appendChild(confettiPiece);
    }

    // Add confetti fall keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confettiFall {
        0% {
          transform: translateY(0) rotate(0deg) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg) scale(0.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(confettiContainer);
    setTimeout(() => {
      confettiContainer.remove();
      style.remove();
    }, 6000);
  };

  const blowCandles = () => {
    setCandlesLit(false);
    createConfetti();
    setTimeout(() => setCandlesLit(true), 4000);
  };

  return (
    <div className={`surprise-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated background */}
      <div className="background-animation">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-gradient-3"></div>
      </div>
      
      {/* Enhanced floating particles */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className={`particle particle-${i % 6}`}>
            <div className="particle-inner"></div>
          </div>
        ))}
      </div>

      {/* Balloons */}
      {showBalloons && (
        <div className="balloons-container">
          {['red', 'blue', 'yellow', 'green', 'purple', 'pink'].map((color, index) => (
            <div key={color} className={`balloon balloon-${color}`} style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="balloon-highlight"></div>
              <div className="balloon-string"></div>
            </div>
          ))}
        </div>
      )}
      
      <div className="content">
        {/* Enhanced Cake */}
        {showCake && (
          <div className="cake-container">
            <div className="cake">
              <div className="plate">
                <div className="plate-shine"></div>
              </div>
              <div className="cake-base">
                <div className="cake-layer layer-bottom">
                  <div className="layer-decoration"></div>
                </div>
                <div className="cake-layer layer-middle">
                  <div className="layer-decoration"></div>
                </div>
                <div className="cake-layer layer-top">
                  <div className="layer-decoration"></div>
                </div>
              </div>
              <div className="frosting">
                <div className="frosting-swirl swirl-1"></div>
                <div className="frosting-swirl swirl-2"></div>
                <div className="frosting-swirl swirl-3"></div>
                <div className="frosting-swirl swirl-4"></div>
              </div>
              <div className="decorations">
                <div className="decoration decoration-1"></div>
                <div className="decoration decoration-2"></div>
                <div className="decoration decoration-3"></div>
                <div className="decoration decoration-4"></div>
                <div className="decoration decoration-5"></div>
              </div>
              <div className="candles">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className={`candle candle-${num} ${candlesLit ? 'lit' : ''}`}>
                    <div className="candle-body"></div>
                    <div className="wick"></div>
                    <div className="flame">
                      <div className="flame-inner"></div>
                    </div>
                    <div className="candle-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Enhanced Message */}
        {showMessage && (
          <div className="message-container">
            <div className="message">
              <div className="title-wrapper">
                <h1 className="birthday-title">
                  <span className="emoji-left">🎉</span>
                  <span className="title-text">Happy Birthday!</span>
                  <span className="emoji-right">🎉</span>
                </h1>
                <div className="title-underline"></div>
              </div>
              <p className="birthday-wish">
                May your special day be filled with happiness, laughter, and all your favorite things!
                <br />
                <span className="wish-accent">Make a wish and blow out the candles! ✨</span>
              </p>
              <div className="button-container">
                <button 
                  className="action-button confetti-btn"
                  onClick={createConfetti}
                >
                  <span className="button-icon">✨</span>
                  <span className="button-text">Celebrate!</span>
                  <span className="button-icon">✨</span>
                  <div className="button-shine"></div>
                </button>
                <button 
                  className="action-button blow-btn"
                  onClick={blowCandles}
                >
                  <span className="button-icon">🌬️</span>
                  <span className="button-text">Blow Candles</span>
                  <span className="button-icon">🕯️</span>
                  <div className="button-shine"></div>
                </button>
              </div>
            </div>
            <div className="message-glow"></div>
          </div>
        )}
      </div>
      
      {/* Sparkles overlay */}
      <div className="sparkles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`sparkle sparkle-${i}`}>⭐</div>
        ))}
      </div>
    </div>
  );
};

export default BirthdaySurprise;