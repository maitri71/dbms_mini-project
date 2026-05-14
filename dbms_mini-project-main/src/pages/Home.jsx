import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaClock, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen pt-16 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vault-accent/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10 w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-block animate-float mb-6">
            <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center bg-black/50 border-vault-accent/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <FaLock className="text-4xl text-vault-neon" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Preserve your <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-accent to-blue-400">memories</span><br/> for the future.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Create digital time capsules locked away until a specific date. 
            Send messages, photos, and secrets to your future self or loved ones.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg py-3 px-8">
              Create a Capsule
            </Link>
            <Link to="/login" className="btn-secondary text-lg py-3 px-8">
              Login to Vault
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mt-24 w-full"
        >
          <div className="glass-card p-6 text-left">
            <div className="w-12 h-12 rounded-lg bg-vault-accent/20 flex items-center justify-center mb-4">
              <FaClock className="text-xl text-vault-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Time-Locked</h3>
            <p className="text-gray-400">Your content is completely blurred and inaccessible until the exact moment you specify.</p>
          </div>
          <div className="glass-card p-6 text-left">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <FaShieldAlt className="text-xl text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
            <p className="text-gray-400">Backed by Firebase, your memories are stored securely and privately in the cloud.</p>
          </div>
          <div className="glass-card p-6 text-left">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <FaLock className="text-xl text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Beautiful Reveal</h3>
            <p className="text-gray-400">Experience a joyous reveal animation when your capsule finally unlocks.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
