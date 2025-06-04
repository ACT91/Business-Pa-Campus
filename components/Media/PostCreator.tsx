import React, { useState } from 'react';
import { createPost } from '../../utils/PostUtils/createPost';
import { useAuth } from '../../src/context/useAuth';

const PostCreator: React.FC<{ onPostCreated?: () => void }> = ({ onPostCreated }) => {
  const [newPostCaption, setNewPostCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedImage || !newPostCaption.trim()) return;

    setLoading(true);
    try {
      await createPost(selectedImage, newPostCaption);
      setNewPostCaption('');
      setSelectedImage(null);
      onPostCreated?.();
    } catch (err) {
      alert("Failed to post. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md mb-6">
      <div className="card-body">
        <form onSubmit={handlePostSubmit}>
          <div className="flex items-start space-x-3">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={user?.photoURL || 'https://i.pravatar.cc/150?img=3'}
                  alt="User"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/150?img=3';
                  }}
                />
              </div>
            </div>
            <div className="flex-1">
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder={user ? 'What are you selling today?' : 'Please login to create a post'}
                value={newPostCaption}
                onChange={(e) => setNewPostCaption(e.target.value)}
                disabled={!user || loading}
              />
              <div className="flex justify-between items-center mt-2">
                <input placeholder='Select an image'
                  type="file"
                  className="file-input file-input-bordered file-input-sm"
                  accept="image/*"
                  disabled={!user || loading}
                  onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={!user || loading}
                >
                  {loading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCreator;