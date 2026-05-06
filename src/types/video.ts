export interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  stats: {
    views: string;
    likes: string;
    comments: string;
  };
  description: string;
}
