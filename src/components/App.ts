import { getPopularMovies } from '../apis/movie';
import { dom } from '../utils/dom';
import Header from './header/Header';
import MovieListContainer from './movieListContainer/MovieListContainer';

class App {
  $target: HTMLElement;

  constructor() {
    this.$target = document.createElement('div');
    this.$target.id = 'app';
    this.render();
  }

  template() {
    return `
    <main>
      <section class="movie-section">
        <h2>지금 인기 있는 영화</h2>
      </section>
    </main>
    `;
  }

  render() {
    (async () => {
      const test = await getPopularMovies(1);
      const movieListContainer = new MovieListContainer(test);

      const $section = dom.getElement<HTMLElement>(this.$target, '.movie-section');
      $section.appendChild(movieListContainer.$target);
    })();

    this.$target.innerHTML = this.template();
    const header = new Header({ imageSrc: './images/logo.png' });

    this.$target.prepend(header.$target);
  }
}
export default App;