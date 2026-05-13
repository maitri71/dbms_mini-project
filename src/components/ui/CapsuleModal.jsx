import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaLock } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useCountdown } from '../../hooks/useCountdown';
import CountdownTimer from './CountdownTimer';

const CapsuleModal = ({ capsule, onClose }) => {
  const { isUnlocked } = useCountdown(capsule.unlockDate);

  useEffect(() => {
    if (isUnlocked) {
      // Trigger confetti when modal opens and capsule is unlocked
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8b5cf6', '#a78bfa', '#ffffff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#8b5cf6', '#a78bfa', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isUnlocked]);

  if (!capsule) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl glass-card overflow-hidden flex flex-col max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-vault-accent text-white rounded-full transition-colors"
          >
            <FaTimes />
          </button>

          {!isUnlocked ? (
            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
              <motion.div 
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-red-400 mb-6 bg-red-500/10 p-6 rounded-full"
              >
                <FaLock size={48} />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">{capsule.title}</h2>
              <p className="text-gray-400 mb-8">This memory is securely locked.</p>
              
              <div className="glass-card p-6 w-full max-w-md bg-black/40">
                <CountdownTimer targetDate={capsule.unlockDate} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
              {capsule.imageUrl && (
                <div className="w-full h-64 md:h-80 relative shrink-0">
                  <img 
                    src={capsule.imageUrl} 
                    alt="Capsule content" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vault-bg to-transparent" />
                </div>
              )}
              
              <div className={`p-8 ${!capsule.imageUrl ? 'pt-12' : 'pt-0'}`}>
                <h2 className="text-3xl font-bold mb-6 text-vault-neon">{capsule.title}</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-gray-200 leading-relaxed text-lg">
                    {capsule.message}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-vault-border text-sm text-gray-500 flex justify-between">
                  <span>Created: {new Date(capsule.createdAt).toLocaleString()}</span>
                  <span>Unlocked: {new Date(capsule.unlockDate).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CapsuleModal;
