import React, { useState, useEffect } from 'react';
import './sc.css';

const ScratchOff = () => {
  const [scratching, setScratching] = useState(false);
  const [scratchArea, setScratchArea] = useState([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (scratchArea.length > 100) {  // Adjust the number for when you want the effect to trigger
      setRevealed(true);
    }
  }, [scratchArea]);

  const handleMouseMove = (e) => {
    if (!scratching) return;

    const rect = e.target.getBoundingClientRect();
    const newScratch = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      size: 20,
    };
    setScratchArea((prev) => [...prev, newScratch]);
  };

  const handleMouseDown = () => {
    setScratching(true);
  };

  const handleMouseUp = () => {
    setScratching(false);
  };

  return (
    <div
      className="scratch-off"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="scratchable-surface">
        {scratchArea.map((scratch, index) => (
          <div
            key={index}
            className="scratch-dot"
            style={{
              left: `${scratch.x - scratch.size / 2}px`,
              top: `${scratch.y - scratch.size / 2}px`,
              width: `${scratch.size}px`,
              height: `${scratch.size}px`,
            }}
          ></div>
        ))}
      </div>

      {/* Epic Text Reveal */}
      <div className={`revealed-content ${revealed ? 'revealed' : ''}`}>
        <h2>Congratulations, You Scratched it!</h2>
        <p className="epic-text">You've unlocked the secret! 🎉</p>
      </div>
    </div>
  );
};

export default ScratchOff;
