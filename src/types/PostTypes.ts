export interface IPost {
  id?: string | undefined;
  picture: string;
  caption: string;
  date: string;
  hashtags: string[];
  gallery?: string;
  likes?: number;
  comments?: number;
}

export interface FormPost {
  picture: string;
  caption: string;
  hashtags: string | string[];
  gallery: string;
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
