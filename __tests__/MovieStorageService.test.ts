import { IMovie } from '../src/types/movie';
import MovieStorageService from '../src/domains/MovieStorageService';

class StorageMock implements Storage {
  store: Map<string, string> = new Map();

  clear() {
    this.store = new Map();
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  get length(): number {
    return Object.keys(this.store).length;
  }
  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

describe('MovieStorageService 테스트', () => {
  const MOVIE1: IMovie = {
    id: 1,
    title: '영화1',
    imageSrc: 'http://www.abc.com/a.jpg',
    score: 4,
    genre: ['Action'],
    description: '설명1',
  };
  const MOVIE2: IMovie = {
    id: 2,
    title: '영화2',
    imageSrc: 'http://www.abc.com/a.jpg',
    score: 8,
    genre: ['Action'],
    description: '설명2',
  };

  const movieToMovieScore = (movie: IMovie) => ({ id: movie.id, score: movie.score });
  const moviesToMovieScores = (movies: IMovie[]) => movies.map(movieToMovieScore);
  it('영화 하나의 별점을 저장했을 때, 저장한 영화 하나의 별점이 불러와진다.', () => {
    const movieStorageService = new MovieStorageService(new StorageMock());
    movieStorageService.save([MOVIE1]);
    const EXPECTED_RESULT = moviesToMovieScores([MOVIE1]);

    const MOVIES_RESULT = movieStorageService.load();

    expect(MOVIES_RESULT).toEqual(EXPECTED_RESULT);
  });

  it('영화 하나의 별점을 업데이트 하였을 떄, 스토리지에 반영된다.', () => {
    const movieStorageService = new MovieStorageService(new StorageMock());
    movieStorageService.save([MOVIE1, MOVIE2]);

    const MOVIE2_UPDATED = { ...MOVIE2, description: '설명2_업데이트' };
    const EXPECTED_RESULT = moviesToMovieScores([MOVIE1, MOVIE2_UPDATED]);

    movieStorageService.update(MOVIE2_UPDATED);

    expect(movieStorageService.load()).toEqual(EXPECTED_RESULT);
  });
});
