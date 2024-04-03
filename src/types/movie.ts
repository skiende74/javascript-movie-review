export type TGenre =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Music'
  | 'Mystery'
  | 'Romance'
  | 'Science Fiction'
  | 'TV Movie'
  | 'Thriller'
  | 'War'
  | 'Western';

type TLanguage = string; // 'en' | ...

export interface IMovieResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: TLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

export interface ISearchResult {
  movies: IMovie[];
  totalPages: number;
}

export interface IMovie {
  id: number;
  title: string;
  imageSrc: string;
  score: number;
  genre: TGenre[];
  description: string;
  myScore?: number;
}
