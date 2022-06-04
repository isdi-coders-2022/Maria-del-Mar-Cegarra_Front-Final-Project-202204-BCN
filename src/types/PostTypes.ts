export interface IPost {
  id?: string;
  picure: string;
  caption: string;
  date: string;
  likes?: number;
  comments?: number;
  hashtags: string[];
}
