export interface ExperienceType {
  title: string;
  description: string;
  role: string;
  time: string;
}

export interface RecommendationType {
  name: string;
  review: string;
}

export interface BlogType {
  filename: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface UserType {
  name: string;
  designation: string;
  site: string;
  about: string;
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    instagram: string;
    twitter: string;
    cal: string;
  };
  skills: string[];
  experiences: ExperienceType[];
  blogs: BlogType[];
  images: string[];
  recommendations: RecommendationType[];
}
