import './MovieListContainer.css';
import { getPopularMovies, searchMoviesByTitle } from '../../apis/movie';
import { IMovie } from '../../types/movie';
import { dom } from '../../utils/dom';
import MovieItem from '../movieItem/MovieItem';
import { InvalidRequestError } from '../../errors/error';

const MOVIE_ITEM_SKELETON_COUNT = 20;
const TEMPLATE = `
<li>
  <a href="#">
    <div class="item-card">
      <div class="item-thumbnail skeleton"></div>
      <div class="item-title skeleton"></div>
      <div class="item-score skeleton"></div>
    </div>
  </a>
</li>`.repeat(MOVIE_ITEM_SKELETON_COUNT);

class MovieListContainer {
  $target: HTMLUListElement = document.createElement('ul');
  page = 1;

  constructor() {
    this.$target.classList.add('item-list');
    this.$target.innerHTML = TEMPLATE;
    (async () => {
      try {
        const { movies, totalPages } = await this.fetchMovies(this.page);
        await this.paint(movies);

        if (this.$target.parentElement === null) return;
        const $moreButton = dom.getElement(this.$target.parentElement, '#more-button');
        if (this.page === totalPages) $moreButton.classList.add('hidden');
      } catch (e) {
        const target = e as InvalidRequestError;
        this.handleErrorToast(target.message);
      }
    })();
  }

  async paint(movies: IMovie[]) {
    this.$target.replaceChildren();
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));
  }

  async attach() {
    this.$target.innerHTML = TEMPLATE;
    const { movies, totalPages } = await this.fetchMovies(this.page);
    Array.from({ length: 20 }).forEach(() => {
      this.$target.removeChild(this.$target.lastChild!);
    });
    this.$target.append(...movies.map(movie => new MovieItem(movie).$target));

    if (this.$target.parentElement === null) return;

    const $moreButton = dom.getElement(this.$target.parentElement, '#more-button');
    if (this.page === totalPages) $moreButton.classList.add('hidden');
    this.page += 1;
  }

  async fetchMovies(page: number) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const mode = urlSearchParams.get('mode') ?? 'popular';
    const title = urlSearchParams.get('title') ?? '';

    const movies = mode === 'search' ? await searchMoviesByTitle(title, page) : await getPopularMovies(this.page);
    return movies;
  }

  initPageNumber() {
    this.page = 1;
  }

  handleErrorToast(errorMessage: string) {
    const $button = dom.getElement<HTMLButtonElement>(document.body, '#toast_btn');
    const clickEvent = new CustomEvent('onToast', {
      detail: errorMessage,
      bubbles: true,
    });
    $button.dispatchEvent(clickEvent);
  }
}

export default MovieListContainer;
