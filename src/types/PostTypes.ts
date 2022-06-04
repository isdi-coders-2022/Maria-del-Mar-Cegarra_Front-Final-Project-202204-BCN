export interface IPost {
  picure: string;
  caption: string;
  date: string;
  likes?: number;
  comments?: number;
  hashtags: string[];
}
