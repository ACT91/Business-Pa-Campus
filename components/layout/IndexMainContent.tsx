import { useCallback } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, increment, type DocumentData } from 'firebase/firestore';
import { FaHeart, FaRegHeart, FaComment, FaShare } from 'react-icons/fa';
import { db } from '../../src/firebase';
import { useAuth } from '../../src/context/useAuth';
import PostCreator from '../Media/PostCreator';
import { formatTimePosted } from '../../utils/TimeUtils/formatTime';
import { useEndlessScroll } from '../../utils/PostUtils/endlessScroll';


type Post = {
  id: string;
  user: {
    uid: string;
    name: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timePosted: Date;
};

const IndexMainContent = () => {
  const { user, login } = useAuth();

  const transformPost = useCallback((data: DocumentData & { id: string }): Post => {
    return {
      id: data.id,
      user: {
        uid: data.UserID,
        name: data.UserName,
        avatar: data.UserPhotoURL || `https://i.pravatar.cc/150?u=${data.UserID}`,
      },
      image: data.ImageURL,
      caption: data.PostItSelf,
      likes: data.NumberOfLikes || 0,
      comments: data.NumberOfComments || 0,
      isLiked: user ? data.LikedBy?.includes(user.uid) : false,
      timePosted: data.TimePosted?.toDate() || new Date(),
    };
  }, [user]);

  const { items: posts, loading, hasMore, error } = useEndlessScroll<Post>(
    'posts',
    'TimePosted',
    5,
    transformPost
  );

  const handleLike = useCallback(async (postId: string, isLiked: boolean) => {
    if (!user) {
      login();
      return;
    }

    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      NumberOfLikes: isLiked ? increment(-1) : increment(1),
      LikedBy: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  }, [user, login]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="alert alert-error">
          Error loading posts: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PostCreator onPostCreated={() => window.location.reload()} />

      {posts.map((post) => (
        <div key={post.id} className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <div className="flex items-center space-x-3 mb-4">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://i.pravatar.cc/150?u=${post.user.uid}`;
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{post.user.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatTimePosted(post.timePosted)}
                </p>
              </div>
            </div>

            <figure className="mb-4">
              <img
                src={post.image}
                alt={post.caption}
                className="rounded-lg w-auto h-[300px] object-cover"
                loading="lazy"
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

      {loading && (
        <div className="flex justify-center my-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          You've reached the end
        </div>
      )}
    </div>
  );
};

export default IndexMainContent;