import { useState, useEffect } from 'react';
import { useAuth } from '../../src/context/useAuth';
import { Post } from '../../utils/types';
import { listenToPosts, likePost } from '../../lib/firebase/posts';
import PostCreator from '../Media/PostCreator';
import { formatTimePosted } from '../../utils/TimeUtils/formatTime';
import { FaHeart, FaRegHeart, FaComment, FaShare } from 'react-icons/fa';

const IndexMainContent = () => {
  const { user, login } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = listenToPosts((firebasePosts) => {
      const formattedPosts: Post[] = firebasePosts.map((data: any) => ({
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
      }));
      setPosts(formattedPosts);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLike = async (postId: string, isLiked: boolean) => {
    if (!user) {
      login();
      return;
    }
    await likePost(postId, user.uid, isLiked);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PostCreator onPostCreated={() => { }} />
      {posts.map((post) => (
        <div key={post.id} className="card bg-base-100 shadow-md mb-6">
          {/* Post card content stays unchanged */}
        </div>
      ))}
    </div>
  );
};

export default IndexMainContent;
