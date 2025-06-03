import { useState } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaShare } from 'react-icons/fa';
import { useAuth } from '../../src/context/AuthContext';

type Post = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
};

const IndexMainContent = () => {
  const { user, login } = useAuth(); // 🔑 Auth state
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      image: 'https://via.placeholder.com/500x300',
      caption: 'Selling my barely used textbooks for Business 101. Great condition!',
      likes: 24,
      comments: 5,
      isLiked: false,
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      image: 'https://via.placeholder.com/500x300',
      caption: 'Handmade jewelry for sale. Perfect gifts for friends!',
      likes: 42,
      comments: 8,
      isLiked: true,
    },
  ]);

  const [newPostCaption, setNewPostCaption] = useState('');

  const handleLike = (postId: number) => {
    if (!user) {
      login(); // 🔐 Prompt login
      return;
    }
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      login(); // 🔐 Prompt login
      return;
    }
    if (!newPostCaption.trim()) return;

    const newPost: Post = {
      id: posts.length + 1,
      user: {
        name: user.displayName || 'Current User',
        avatar: user.photoURL || 'https://i.pravatar.cc/150?img=3',
      },
      image: 'https://via.placeholder.com/500x300',
      caption: newPostCaption,
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostCaption('');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Create Post */}
      <div className="card bg-base-100 shadow-md mb-6">
        <div className="card-body">
          <form onSubmit={handlePostSubmit}>
            <div className="flex items-start space-x-3">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src={user?.photoURL || 'https://i.pravatar.cc/150?img=3'}
                    alt="User"
                  />
                </div>
              </div>
              <div className="flex-1">
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder={
                    user
                      ? 'What are you selling today?'
                      : 'Please login to create a post'
                  }
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  disabled={!user}
                ></textarea>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm"
                      accept="image/*"
                      disabled={!user}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={!user}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.map((post) => (
        <div key={post.id} className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            {/* Post Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={post.user.avatar} alt={post.user.name} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{post.user.name}</h3>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>

            {/* Post Image */}
            <figure className="mb-4">
              <img src={post.image} alt="Post" className="rounded-lg w-full" />
            </figure>

            {/* Post Caption */}
            <p className="mb-4">{post.caption}</p>

            {/* Post Actions */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  className="flex items-center space-x-1"
                  onClick={() => handleLike(post.id)}
                >
                  {post.isLiked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1">
                  <FaComment />
                  <span>{post.comments}</span>
                </button>
              </div>
              <button className="btn btn-ghost btn-sm">
                <FaShare />
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex space-x-3">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src="https://i.pravatar.cc/150?img=4" alt="Commenter" />
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={
                      user ? 'Write a comment...' : 'Login to comment...'
                    }
                    className="input input-bordered w-full input-sm"
                    disabled={!user}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndexMainContent;
