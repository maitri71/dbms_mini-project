import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaImage, FaUpload } from 'react-icons/fa';

const CreateCapsule = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type (images only)
    if (!file.type.startsWith('image/')) {
      return toast.error("Please upload an image file (JPEG, PNG, etc.)");
    }

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return toast.error("Image must be less than 5MB");
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message || !unlockDate) {
      return toast.error("Please fill in all required fields.");
    }

    // Ensure date is in the future
    if (new Date(unlockDate) <= new Date()) {
      return toast.error("Unlock date must be in the future.");
    }

    try {
      setLoading(true);
      let imageUrl = null;

      if (imageFile) {
        // Upload image to Storage
        const fileRef = ref(storage, `capsules/${currentUser.uid}/${Date.now()}_${imageFile.name}`);
        await uploadBytes(fileRef, imageFile);
        imageUrl = await getDownloadURL(fileRef);
      }

      // Save to Firestore
      await addDoc(collection(db, 'capsules'), {
        userId: currentUser.uid,
        title,
        message,
        imageUrl,
        unlockDate: new Date(unlockDate).toISOString(),
        createdAt: new Date().toISOString(),
      });

      toast.success("Capsule locked successfully!");
      navigate('/dashboard');

    } catch (error) {
      console.error("Error creating capsule:", error);
      toast.error("Failed to create capsule. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex justify-center">
      <div className="w-full max-w-2xl glass-card p-8 md:p-10">
        <h1 className="text-3xl font-bold mb-2">Create New Capsule</h1>
        <p className="text-gray-400 mb-8">Lock your memories away for a future date.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Capsule Title *</label>
            <input 
              type="text" 
              required 
              maxLength={50}
              className="glass-input"
              placeholder="e.g., A message to my future self"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
            <textarea 
              required 
              rows={5}
              className="glass-input resize-none"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Unlock Date & Time *</label>
            <input 
              type="datetime-local" 
              required 
              className="glass-input"
              value={unlockDate}
              onChange={(e) => setUnlockDate(e.target.value)}
              // Set minimum datetime to now
              min={new Date().toISOString().slice(0, 16)}
            />
            <p className="text-xs text-gray-500 mt-2">The capsule will remain blurred and locked until this exact time.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Attach Image (Optional)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-vault-border border-dashed rounded-xl bg-black/20 hover:bg-black/40 transition-colors">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="mx-auto h-48 object-cover rounded-lg" />
                    <button 
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-full text-xs hover:bg-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-400 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-vault-bg rounded-md font-medium text-vault-neon hover:text-vault-accent focus-within:outline-none px-2 py-1">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3"
            >
              <FaUpload />
              {loading ? 'Locking Vault...' : 'Lock Capsule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCapsule;
