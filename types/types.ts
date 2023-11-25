export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface MovieCardType {
  Response: 'True' | 'False';
  Error?: string;
  Search: Movie[];
  totalResults: number;
}
