import { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinish }) => {
  const [countdown, setCountdown] = useState(5);
  const [isVisible, setIsVisible] = useState(true);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    // Show sparkles after a short delay
    const sparkleTimer = setTimeout(() => setShowSparkles(true), 500);

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
      clearTimeout(sparkleTimer);
    };
  }, [onFinish]);

  const generateSparkles = () => {
    return [...Array(15)].map((_, i) => (
      <div
        key={i}
        className={`sparkle sparkle-${i + 1}`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      >
        ✨
      </div>
    ));
  };

  return (
    <div className={`splash-container ${!isVisible ? 'fade-out' : ''}`}>
      <div className="background-gradient"></div>
      
      {/* Animated background shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Sparkles */}
      {showSparkles && (
        <div className="sparkles-container">
          {generateSparkles()}
        </div>
      )}

      <div className="splash-content">
        <div className="logo-container">
          <div className="birthday-icon">🎂</div>
        </div>
        
        <h1 className="splash-title">
          <span className="title-word">Birthday</span>
          <span className="title-word">Surprise!</span>
        </h1>
        
        <p className="splash-text">
          <span className="text-line">Get ready for something</span>
          <span className="text-highlight">magical</span>
          <span className="text-dots">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </p>
        
        <div className="countdown-container">
          <div className="countdown-circle">
            <svg className="progress-ring" width="120" height="120">
              <circle
                className="progress-ring-background"
                cx="60"
                cy="60"
                r="50"
              />
              <circle
                className="progress-ring-progress"
                cx="60"
                cy="60"
                r="50"
                style={{
                  strokeDasharray: `${2 * Math.PI * 50}`,
                  strokeDashoffset: `${2 * Math.PI * 50 * (countdown / 5)}`
                }}
              />
            </svg>
            <div className="countdown-content">
              <span className="countdown-number">{countdown}</span>
              <span className="countdown-label">
                {countdown === 1 ? 'second' : 'seconds'}
              </span>
            </div>
          </div>
        </div>

        <div className="loading-bar">
          <div 
            className="loading-fill"
            style={{ width: `${((5 - countdown) / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Celebration emojis */}
      <div className="celebration-emojis">
        <span className="emoji emoji-1">🎉</span>
        <span className="emoji emoji-2">🎈</span>
        <span className="emoji emoji-3">🎊</span>
        <span className="emoji emoji-4">🎁</span>
        <span className="emoji emoji-5">🌟</span>
        <span className="emoji emoji-6">🎵</span>
      </div>
    </div>
  );
};

export default SplashScreen;