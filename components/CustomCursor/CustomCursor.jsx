import React, { useEffect } from 'react';
import './CustomCursor.css'; // Style for cursor
import { FaRegCircle } from 'react-icons/fa6';

const CustomCursor = () => {
  useEffect(() => {
    const cursorElement = document.querySelector('.cursor');

    const moveCursor = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Smoothly animate the cursor's position
      cursorElement.animate(
        [
          { transform: `translate(${cursorElement.style.left}px, ${cursorElement.style.top}px)` },
          { transform: `translate(${posX}px, ${posY}px)` },
        ],
        {
          duration: 600, //  in milliseconds
          fill: 'forwards', 
          easing: 'ease-out',
        }
      );
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div className="cursor">
      <FaRegCircle className="cursor-icon" size={45} />
    </div>
  );
};

export default CustomCursor;
