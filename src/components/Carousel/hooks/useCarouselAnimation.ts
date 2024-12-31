import { useEffect, useState } from 'react';

interface UseCarouselAnimationProps {
  initialRotation?: number;
  speed?: number;
  isPaused?: boolean;
}

export const useCarouselAnimation = ({
  initialRotation = 0,
  speed = 30, // Slower rotation for smoother animation
  isPaused = false
}: UseCarouselAnimationProps = {}) => {
  const [rotation, setRotation] = useState(initialRotation);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360); // Smaller increment for smoother motion
    }, speed);
    
    return () => clearInterval(interval);
  }, [isPaused, speed]);

  return rotation;
};