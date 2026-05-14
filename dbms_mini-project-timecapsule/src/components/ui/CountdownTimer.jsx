import { useCountdown } from '../../hooks/useCountdown';

const CountdownTimer = ({ targetDate }) => {
  const { timeLeft, isUnlocked } = useCountdown(targetDate);

  if (!timeLeft) return null;

  if (isUnlocked) {
    return (
      <div className="text-green-400 font-bold tracking-widest uppercase">
        Unlocked
      </div>
    );
  }

  return (
    <div className="flex space-x-2 text-center text-white">
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-bold bg-black/50 px-2 py-1 rounded">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-400 uppercase mt-1">Days</span>
      </div>
      <span className="text-xl font-bold mt-1">:</span>
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-bold bg-black/50 px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-400 uppercase mt-1">Hrs</span>
      </div>
      <span className="text-xl font-bold mt-1">:</span>
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-bold bg-black/50 px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-400 uppercase mt-1">Min</span>
      </div>
      <span className="text-xl font-bold mt-1">:</span>
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-bold bg-black/50 px-2 py-1 rounded text-vault-neon">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[10px] text-gray-400 uppercase mt-1">Sec</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
