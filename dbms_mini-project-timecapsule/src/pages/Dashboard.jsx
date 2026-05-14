import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import CapsuleCard from '../components/ui/CapsuleCard';
import CapsuleModal from '../components/ui/CapsuleModal';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const q = query(
          collection(db, 'capsules'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedCapsules = [];
        querySnapshot.forEach((doc) => {
          fetchedCapsules.push({ id: doc.id, ...doc.data() });
        });
        setCapsules(fetchedCapsules);
      } catch (error) {
        console.error("Error fetching capsules:", error);
        toast.error("Failed to load your capsules.");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchCapsules();
    }
  }, [currentUser]);

  const handleOpenCapsule = (capsule) => {
    setSelectedCapsule(capsule);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Vault</h1>
        <Link to="/create" className="btn-primary flex items-center gap-2">
          <FaPlus /> New Capsule
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vault-accent"></div>
        </div>
      ) : capsules.length === 0 ? (
        <div className="glass-card p-12 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-vault-border flex items-center justify-center mb-6">
            <FaPlus className="text-3xl text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Vault is Empty</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            You haven't created any memory capsules yet. Start preserving your memories today.
          </p>
          <Link to="/create" className="btn-primary">Create Your First Capsule</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.map(capsule => (
            <CapsuleCard 
              key={capsule.id} 
              capsule={capsule} 
              onClick={handleOpenCapsule} 
            />
          ))}
        </div>
      )}

      {selectedCapsule && (
        <CapsuleModal 
          capsule={selectedCapsule} 
          onClose={() => setSelectedCapsule(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
