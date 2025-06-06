// utils/PostTypes/posts.ts
import { Timestamp } from 'firebase/firestore';

export interface PostInput {
  imageFile: File;
  postText: string;
  userId: string;
  userName: string;
}

export interface Post {
  PostID: string;
  PostItSelf: string;
  ImageURL: string;
  UserID: string;
  UserName: string;
  TimePosted: Timestamp;
  DatePosted: string;
  NumberOfLikes: number;
  NumberOfComments: number;
  IsLiked: boolean;
}