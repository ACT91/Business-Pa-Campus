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
  type DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from '../../src/firebase';
import { Timestamp } from 'firebase/firestore'; // Import the Timestamp type from firebase/firestore

type FirebasePost = {
  PostID: string;
  PostItSelf: string;
  ImageURL: string;
  UserID: string;
  UserName: string;
  UserPhotoURL?: string;
  NumberOfLikes?: number;
  NumberOfComments?: number;
  LikedBy?: string[];
  TimePosted?: Timestamp;
};

export type Post = FirebasePost & {
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

export const listenToPosts = (
  callback: (posts: DocumentData[]) => void
) => {
  const q = query(collection(db, 'posts'), orderBy('TimePosted', 'desc'));
  return onSnapshot(q, (snapshot: QuerySnapshot) => {
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(posts);
  });
};

export const likePost = async (
  postId: string,
  userId: string,
  isLiked: boolean
) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    NumberOfLikes: isLiked ? increment(-1) : increment(1),
    LikedBy: isLiked ? arrayRemove(userId) : arrayUnion(userId),
  });
};
