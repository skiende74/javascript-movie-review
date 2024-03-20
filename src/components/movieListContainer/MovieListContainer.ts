import { getPopularMovies, searchMoviesByTitle } from '../../apis/movie';
import { IMovie } from '../../types/movie';
import MovieItem from '../movieItem/MovieItem';

class MovieListContainer {
  $target;
  page = 0;

  constructor() {
    this.$target = document.createElement('ul');
    this.$target.classList.add('item-list');
    this.$target.innerHTML += this.template();
    (async () => {
      this.page += 1;
      const movies = await this.fetchMovies();
      await this.paint(movies);
    })();
  }

  template() {
    return /* html */ `
      ${Array.from({ length: 20 })
        .map(
          () =>
            ` 
            <li>
              <a href="#">
                <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
                </div>
              </a>
             </li>
          `,
        )
        .join('')}

    `;
  }

  async paint(movies: IMovie[]) {
    this.$target.replaceChildren();
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
  }

  async attach() {
    this.page += 1;
    const movies = await this.fetchMovies();
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
  }

  async fetchMovies() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const mode = urlSearchParams.get('mode') ?? 'popular';
    const title = urlSearchParams.get('title') ?? '';

    const movies = mode === 'search' ? await searchMoviesByTitle(title, this.page) : await getPopularMovies(this.page);
    return movies;
  }
}

export default MovieListContainer;
