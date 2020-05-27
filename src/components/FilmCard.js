import {createElement} from "../utils.js";

const createFilmCardTemplate = (filmCard) => {
  const {title, rating, releaseDate, duration, genre, poster, description, countOfComments, IsWatchlist, IsWatched, IsFavorite} = filmCard;

  const year = `${releaseDate.getFullYear()}`;

  const watchlistButtonInactiveClass =  IsWatchlist ? `film-card__controls-item--active` : ``;
  const watchedButtonInactiveClass =  IsWatched ? `film-card__controls-item--active` : ``;
  const favoriteButtonInactiveClass =  IsFavorite ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${countOfComments} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButtonInactiveClass}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedButtonInactiveClass}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButtonInactiveClass}">Mark as favorite</button>
        </form>
      </article>`
  );
};

export default class FilmCard {
  constructor(filmCard) {
    this._filmCard = filmCard;
    this._element = null;
  }
  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
