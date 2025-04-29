import React, { useState, useRef, useEffect } from 'react';
import './SpinWheel.css'; 

const SpinWheel = ({ show, onClose }) => {
  const wheelRef = useRef(null);
  const [spinCount, setSpinCount] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes in seconds

  useEffect(() => {
    let timer;
    if (showCongrats) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showCongrats]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const spinWheel = () => {
    const wheel = wheelRef.current;
    if (wheel) {
      if (spinCount === 0) {
        wheel.style.transition = 'transform 2s ease-out';
        wheel.style.transform = `rotate(${720 + 180 + 22.5}deg)`;
        setSpinCount(1);
      } else if (spinCount === 1) {
        wheel.style.transition = 'transform 3s ease-out';
        wheel.style.transform = `rotate(${1440 + 0 + 22.5}deg)`;
        setSpinCount(2);

        setTimeout(() => {
          wheel.classList.add('bounce');
          setShowCongrats(true);
        }, 3200);
      }
    }
  };

  const closeCongrats = () => {
    setShowCongrats(false);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="spin-popup-overlay">
      <div className="spin-popup">
        <h2 className="spin-title">🎯 Spin the Wheel for a Discount!</h2>
        <div className="arrow">▼</div>
        <div className="wheel" ref={wheelRef}>
          <div className="wheel-slice"><span>15% OFF</span></div>
          <div className="wheel-slice"><span>Free Item</span></div>
          <div className="wheel-slice"><span>Spin Again</span></div>
          <div className="wheel-slice"><span>5% OFF</span></div>
          <div className="wheel-slice"><span>Spin Again</span></div>
          <div className="wheel-slice"><span>Free Shipping</span></div>
          <div className="wheel-slice"><span>10% OFF</span></div>
          <div className="wheel-slice"><span>Spin Again</span></div>
        </div>
        {spinCount < 2 && (
          <button onClick={spinWheel} className="spin-button">
            Spin
          </button>
        )}
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>

      {showCongrats && (
        <div className="congrats-popup">
          <h2>🎉 Congratulations! 🎉</h2>
          <p>You won 15% OFF!</p>
          <p>Use promo code: <strong>SAVE15</strong></p>
          <p>Expires in: <strong>{formatTime(timeLeft)}</strong></p>
          <button onClick={closeCongrats} className="close-button">
            Awesome!
          </button>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
