import { useState, useEffect, useRef } from 'react';
import './BirthdaySurprise.css';
import happyBirthdaySong from './assets/happy-birthday.mp3';

const BirthdaySurprise = ({ celebrantName, senderName }) => {
  const [showCake, setShowCake] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Initialize audio
    audioRef.current = new Audio(happyBirthdaySong);
    audioRef.current.loop = false;
    audioRef.current.volume = volume;

    setIsLoaded(true);
    const timer1 = setTimeout(() => setShowCake(true), 800);
    const timer2 = setTimeout(() => setShowMessage(true), 2000);
    const timer3 = setTimeout(() => setShowBalloons(true), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', checkIfMobile);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playBirthdaySong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.muted = false;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          audioRef.current.muted = false;
        })
        .catch(error => {
          console.error("Audio playback failed:", error);
          alert("Please tap again to play the birthday song!");
        });
      
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

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

    const confettiCount = isMobile ? 50 : 80;
    for (let i = 0; i < confettiCount; i++) {
      const confettiPiece = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * (isMobile ? 8 : 10) + 6;
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

  const handleCelebrate = () => {
    createConfetti();
    playBirthdaySong();
  };

  const blowCandles = () => {
    setCandlesLit(false);
    createConfetti();
    setTimeout(() => setCandlesLit(true), 4000);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
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
        {[...Array(isMobile ? 20 : 30)].map((_, i) => (
          <div key={i} className={`particle particle-${i % 6}`}>
            <div className="particle-inner"></div>
          </div>
        ))}
      </div>

      {/* Balloons */}
      {showBalloons && (
        <div className="balloons-container">
          {['red', 'blue', 'yellow', 'green', 'purple', 'pink', 'gold', 'silver'].map((color, index) => (
            <div 
              key={color} 
              className={`balloon balloon-${color}`} 
              style={{ 
                animationDelay: `${index * 0.2}s`,
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '80px' : '100px'
              }}
            >
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
            <div className="cake" style={{
              width: isMobile ? '150px' : '200px',
              height: isMobile ? '90px' : '120px'
            }}>
              <div className="plate" style={{
                width: isMobile ? '180px' : '240px',
                height: isMobile ? '25px' : '30px',
                bottom: isMobile ? '-12px' : '-15px',
                left: isMobile ? '-15px' : '-20px'
              }}>
                <div className="plate-shine"></div>
              </div>
              <div className="cake-base">
                <div className="cake-layer layer-bottom" style={{
                  height: isMobile ? '40px' : '50px'
                }}>
                  <div className="layer-decoration"></div>
                </div>
                <div className="cake-layer layer-middle" style={{
                  height: isMobile ? '30px' : '40px',
                  width: isMobile ? '85%' : '90%',
                  bottom: isMobile ? '35px' : '45px'
                }}>
                  <div className="layer-decoration"></div>
                </div>
                <div className="cake-layer layer-top" style={{
                  height: isMobile ? '25px' : '30px',
                  width: isMobile ? '75%' : '80%',
                  bottom: isMobile ? '65px' : '80px'
                }}>
                  <div className="layer-decoration"></div>
                </div>
              </div>
              <div className="frosting" style={{
                width: isMobile ? '75%' : '80%',
                bottom: isMobile ? '85px' : '105px'
              }}>
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
              <div className="candles" style={{
                bottom: isMobile ? '100px' : '120px'
              }}>
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className={`candle candle-${num} ${candlesLit ? 'lit' : ''}`} style={{
                    width: isMobile ? '10px' : '12px',
                    height: isMobile ? '35px' : '40px'
                  }}>
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
          <div className="message-container" style={{
            padding: isMobile ? '20px' : '30px',
            maxWidth: isMobile ? '90%' : '500px'
          }}>
            <div className="message">
              <div className="title-wrapper">
                <h1 className="birthday-title">
                  <span className="emoji-left">🎉</span>
                  <span className="title-text">Happy Birthday, {celebrantName}!</span>
                  <span className="emoji-right">🎉</span>
                </h1>
                <div className="title-underline"></div>
              </div>
              <p className="birthday-wish">
                May your special day be filled with happiness, laughter, and all your favorite things!
                <br />
                <span className="wish-accent">Make a wish and blow out the candles! ✨</span>
              </p>
              <div className="signature">
                <p>With love,</p>
                <p className="sender-name">{senderName}</p>
              </div>
              <div className="button-container">
                <button 
                  className={`action-button confetti-btn ${isPlaying ? 'pulse' : ''}`}
                  onClick={handleCelebrate}
                >
                  <span className="button-icon">✨</span>
                  <span className="button-text">
                    {isPlaying ? 'Playing...' : 'Celebrate!'}
                  </span>
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
              {isPlaying && (
                <div className="volume-control">
                  <span>🔈</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              )}
              {isPlaying && (
                <div className="music-note">
                  🎵
                </div>
              )}
            </div>
            <div className="message-glow"></div>
          </div>
        )}
      </div>
      
      {/* Sparkles overlay */}
      <div className="sparkles">
        {[...Array(isMobile ? 8 : 12)].map((_, i) => (
          <div 
            key={i} 
            className={`sparkle sparkle-${i}`}
            style={{
              fontSize: isMobile ? '16px' : '20px'
            }}
          >⭐</div>
        ))}
      </div>
    </div>
  );
};

export default BirthdaySurprise;
