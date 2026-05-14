import { motion } from 'framer-motion';
import { FaLock, FaUnlock } from 'react-icons/fa';
import CountdownTimer from './CountdownTimer';
import { useCountdown } from '../../hooks/useCountdown';

const CapsuleCard = ({ capsule, onClick }) => {
  const { isUnlocked } = useCountdown(capsule.unlockDate);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative overflow-hidden rounded-xl cursor-pointer border ${
        isUnlocked ? 'border-vault-accent/50 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'border-vault-border'
      }`}
      onClick={() => onClick(capsule)}
    >
      {/* Background Image / Blur */}
      <div className="absolute inset-0 z-0">
        {capsule.imageUrl ? (
          <img 
            src={capsule.imageUrl} 
            alt="Capsule preview" 
            className={`w-full h-full object-cover transition-all duration-700 ${
              isUnlocked ? 'blur-none opacity-40' : 'blur-xl opacity-20'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-vault-bg to-[#1a1a2e]" />
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 p-6 flex flex-col h-full min-h-[240px] bg-vault-bg/60 backdrop-blur-[2px]">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white truncate pr-4">{capsule.title}</h3>
          <div className={`p-2 rounded-full ${isUnlocked ? 'bg-vault-accent/20 text-vault-accent' : 'bg-red-500/20 text-red-400'}`}>
            {isUnlocked ? <FaUnlock size={16} /> : <FaLock size={16} />}
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center py-4">
          <CountdownTimer targetDate={capsule.unlockDate} />
        </div>

        <div className="mt-auto text-sm text-gray-400">
          Created: {new Date(capsule.createdAt).toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
};

export default CapsuleCard;
