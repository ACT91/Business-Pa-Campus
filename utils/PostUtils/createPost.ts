import { db, storage, auth } from '../../src/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp, updateDoc } from 'firebase/firestore';

export const createPost = async (imageFile: File, postText: string) => {
  try {
    if (!auth.currentUser) throw new Error('User not authenticated');

    // Upload image
    const fileRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
    const uploadSnapshot = await uploadBytes(fileRef, imageFile);
    const imageUrl = await getDownloadURL(uploadSnapshot.ref);

    // Create post data
    const postData = {
      PostID: "",
      PostURL: "",
      PostItSelf: postText,
      ImageURL: imageUrl,
      UserID: auth.currentUser.uid,
      UserName: auth.currentUser.displayName || "Anonymous",
      UserPhotoURL: auth.currentUser.photoURL || "", // Store the photoURL
      TimePosted: Timestamp.now(),
      DatePosted: new Date().toISOString(),
      NumberOfLikes: 0,
      NumberOfComments: 0,
      IsLiked: false,
      LikedBy: []
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, "posts"), postData);
    await updateDoc(docRef, {
      PostID: docRef.id,
      PostURL: `/posts/${docRef.id}`
    });

    return docRef.id;
  } catch (err) {
    console.error("Failed to create post:", err);
    throw err;
  }
};