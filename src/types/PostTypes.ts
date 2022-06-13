import { UserData } from "./UserTypes";

export interface IPost {
  id?: string;
  picture: string;
  user: UserData;
  pictureBackup?: string;
  caption: string;
  date: string;
  hashtags: string[];
  gallery: Gallery;
  likes?: number;
  comments?: number;
}

export interface FormPost {
  picture: string | Blob;
  caption: string;
  hashtags: string | string[];
  galleryId: string;
}

export interface AxiosPostsReturn {
  status: number;
  data?:
    | {
        posts: IPost[];
      }
    | {
        post: IPost;
      }
    | null;
}

export interface Gallery {
  name: string;
  location: string;
  id: string;
}
