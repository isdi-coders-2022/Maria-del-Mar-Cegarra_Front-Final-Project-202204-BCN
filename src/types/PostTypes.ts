export interface IPost {
  id?: string;
  picure: string;
  caption: string;
  date: string;
  likes?: number;
  comments?: number;
  hashtags: string[];
}

export interface AxiosPostsReturn {
  status: number;
  data?: {
    posts: IPost[];
  } | null;
}
