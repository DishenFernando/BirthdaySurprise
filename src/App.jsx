import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import BirthdaySurprise from './components/BirthdaySurprise';
import './index.css';

function App() {
  const [showSurprise, setShowSurprise] = useState(false);

  return (
    <div className="app">
      {!showSurprise ? (
        <SplashScreen onFinish={() => setShowSurprise(true)} />
      ) : (
        <BirthdaySurprise />
      )}
    </div>
  );
}

export default App;