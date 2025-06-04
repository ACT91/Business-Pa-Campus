import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from 'firebase/firestore';
import { FaHeart, FaRegHeart, FaComment, FaShare } from 'react-icons/fa';
import { db } from '../../src/firebase';
import { useAuth } from '../../src/context/AuthContext';
import PostCreator from '../Media/PostCreator';

type Post = {
  id: string;
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
  const { user, login } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('TimePosted', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedPosts: Post[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          user: {
            name: data.UserName,
            avatar: user?.uid === data.UserID 
              ? user?.photoURL || `https://i.pravatar.cc/150?u=${data.UserID}`
              : `https://i.pravatar.cc/150?u=${data.UserID}`,
          },
          image: data.ImageURL,  // Changed from PostURL to ImageURL
          caption: data.PostItSelf,
          likes: data.NumberOfLikes || 0,
          comments: data.NumberOfComments || 0,
          isLiked: user ? data.LikedBy?.includes(user.uid) : false,
        };
      });
      setPosts(updatedPosts);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLike = async (postId: string, isLiked: boolean) => {
    if (!user) {
      login();
      return;
    }

    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      NumberOfLikes: isLiked ? increment(-1) : increment(1),
      LikedBy: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  };

  const handlePostCreated = () => {
    console.log('Post created!');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PostCreator onPostCreated={handlePostCreated} />

      {posts.map((post) => (
        <div key={post.id} className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <div className="flex items-center space-x-3 mb-4">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://i.pravatar.cc/150?u=${post.id}`;
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{post.user.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.id).toLocaleString()} {/* Temporary - implement proper time formatting */}
                </p>
              </div>
            </div>

            <figure className="mb-4">
              <img 
                src={post.image} 
                alt="Post" 
                className="rounded-lg w-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x300';
                }}
              />
            </figure>

            <p className="mb-4">{post.caption}</p>

            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  className="flex items-center space-x-1"
                  onClick={() => handleLike(post.id, post.isLiked)}
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
              <button title="Share" className="btn btn-ghost btn-sm">
                <FaShare />
              </button>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex space-x-3">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={user?.photoURL || 'https://i.pravatar.cc/150?img=4'}
                      alt="Commenter"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/150?img=4';
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={user ? 'Write a comment...' : 'Login to comment...'}
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