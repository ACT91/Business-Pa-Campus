// editPost.ts
import { db } from '../../src/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const editPost = async (postId: string, newPostText: string) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      PostItSelf: newPostText,
      TimePosted: new Date() // Optionally update timestamp
    });
  } catch (err) {
    console.error("Failed to update post:", err);
    throw err;
  }
};
