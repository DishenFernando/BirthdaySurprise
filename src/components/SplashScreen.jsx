import { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinish }) => {
  const [countdown, setCountdown] = useState(5);
  const [isVisible, setIsVisible] = useState(true);
  const [showSparkles, setShowSparkles] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showElements, setShowElements] = useState({
    logo: false,
    title: false,
    text: false,
    countdown: false
  });

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Staggered element animations
    const timers = [
      setTimeout(() => setShowElements(prev => ({...prev, logo: true})), 200),
      setTimeout(() => setShowElements(prev => ({...prev, title: true})), 400),
      setTimeout(() => setShowElements(prev => ({...prev, text: true})), 600),
      setTimeout(() => setShowElements(prev => ({...prev, countdown: true}))), 800,
      setTimeout(() => setShowSparkles(true), 500)
    ];

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsVisible(false);
          setTimeout(() => onFinish(), 800);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      timers.forEach(timer => clearTimeout(timer));
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [onFinish]);

  const generateSparkles = () => {
    const count = isMobile ? 15 : 25;
    return [...Array(count)].map((_, i) => (
      <div
        key={i}
        className={`sparkle sparkle-${i + 1}`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${1 + Math.random() * 2}s`,
          fontSize: isMobile ? `${8 + Math.random() * 8}px` : `${12 + Math.random() * 12}px`,
          opacity: 0.7 + Math.random() * 0.3
        }}
      >
        {['✨', '⭐', '🌟', '⚡', '💫'][Math.floor(Math.random() * 5)]}
      </div>
    ));
  };

  return (
    <div className={`splash-container ${!isVisible ? 'fade-out' : ''}`}>
      {/* Gradient background with animated layers */}
      <div className="background-animation">
        <div className="bg-layer layer-1"></div>
        <div className="bg-layer layer-2"></div>
        <div className="bg-layer layer-3"></div>
      </div>
      
      {/* Floating abstract shapes - reduced on mobile */}
      <div className="floating-shapes">
        {[...Array(isMobile ? 5 : 8)].map((_, i) => (
          <div 
            key={i}
            className={`shape shape-${i + 1}`}
            style={{
              animationDuration: `${15 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              width: isMobile ? `${100 + Math.random() * 100}px` : `${150 + Math.random() * 150}px`,
              height: isMobile ? `${100 + Math.random() * 100}px` : `${150 + Math.random() * 150}px`
            }}
          ></div>
        ))}
      </div>

      {/* Dynamic sparkles */}
      {showSparkles && (
        <div className="sparkles-container">
          {generateSparkles()}
        </div>
      )}

      <div className="splash-content">
        {/* Animated logo */}
        <div className={`logo-container ${showElements.logo ? 'show' : ''}`}>
          <div className="birthday-icon">
            <div className="icon-inner">🎂</div>
            <div className="icon-glow"></div>
          </div>
        </div>
        
        {/* Staggered title animation */}
        <h1 className="splash-title">
          <span className={`title-word ${showElements.title ? 'show' : ''}`}>
            <span className="word-inner">Birthday</span>
          </span>
          <span className={`title-word ${showElements.title ? 'show' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <span className="word-inner">Surprise!</span>
          </span>
        </h1>
        
        {/* Animated text */}
        <div className={`splash-text ${showElements.text ? 'show' : ''}`}>
          <span className="text-line">Get ready for something</span>
          <span className="text-highlight">
            <span className="highlight-inner">magical</span>
          </span>
          <span className="text-dots">
            {[...Array(3)].map((_, i) => (
              <span 
                key={i} 
                className="dot" 
                style={{ animationDelay: `${i * 0.2}s` }}
              >.</span>
            ))}
          </span>
        </div>
        
        {/* Countdown with circular progress */}
        <div className={`countdown-container ${showElements.countdown ? 'show' : ''}`}>
          <div className="countdown-circle">
            <svg className="progress-ring" width={isMobile ? "100" : "140"} height={isMobile ? "100" : "140"}>
              <circle
                className="progress-ring-background"
                cx={isMobile ? "50" : "70"}
                cy={isMobile ? "50" : "70"}
                r={isMobile ? "40" : "60"}
              />
              <circle
                className="progress-ring-progress"
                cx={isMobile ? "50" : "70"}
                cy={isMobile ? "50" : "70"}
                r={isMobile ? "40" : "60"}
                style={{
                  strokeDasharray: `${2 * Math.PI * (isMobile ? 40 : 60)}`,
                  strokeDashoffset: `${2 * Math.PI * (isMobile ? 40 : 60) * (countdown / 5)}`
                }}
              />
            </svg>
            <div className="countdown-content">
              <span className="countdown-number">{countdown}</span>
              <span className="countdown-label">
                {countdown === 1 ? 'second' : 'seconds'}
              </span>
            </div>
            <div className="countdown-glow"></div>
          </div>
        </div>

        {/* Loading bar */}
        <div className="loading-bar">
          <div 
            className="loading-fill"
            style={{ width: `${((5 - countdown) / 5) * 100}%` }}
          ></div>
          <div className="loading-glow"></div>
        </div>
      </div>

      {/* Floating celebration emojis */}
      <div className="celebration-emojis">
        {['🎉', '🎈', '🎊', '🎁', '🌟', '🎵', '🥳', '🎀'].map((emoji, i) => (
          <span 
            key={i}
            className={`emoji emoji-${i + 1}`}
            style={{
              animationDuration: `${8 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: isMobile ? `${16 + Math.random() * 12}px` : `${24 + Math.random() * 16}px`
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
