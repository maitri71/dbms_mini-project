import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

export const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = differenceInSeconds(target, now);

      if (diff <= 0) {
        setIsUnlocked(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsUnlocked(false);
      setTimeLeft({
        days: Math.floor(diff / (3600 * 24)),
        hours: Math.floor((diff % (3600 * 24)) / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isUnlocked };
};
