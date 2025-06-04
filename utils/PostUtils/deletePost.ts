// deletePost.ts
import { db, storage } from '../../src/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

export const deletePost = async (postId: string) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) throw new Error("Post not found");

    const postData = postSnap.data();
    const imageUrl = postData.ImageURL;

    // Delete image from storage
    const imagePath = decodeURIComponent(new URL(imageUrl).pathname.replace(/^\/v0\/b\/[^/]+\/o\//, ''));
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);

    // Delete post from Firestore
    await deleteDoc(postRef);
  } catch (err) {
    console.error("Failed to delete post:", err);
    throw err;
  }
};
