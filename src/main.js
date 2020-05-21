import {createUserRatingTemplate} from "./components/UserRating.js";
import {createNavigationTemplate} from "./components/Navigation.js";
import {createFilterTemplate} from "./components/Filter.js";
import {createFilmsBoardTemplate} from "./components/FilmsBoard.js";
import {createAllFilmsTemplate} from "./components/AllFilms.js";
import {createFilmCardTemplate} from "./components/FilmCard.js";
import {createShowMoreButtonTemplate} from "./components/ShowMoreButton.js";
import {createTopRatedFilmsTemplate} from "./components/TopRatedFilms.js";
import {createMostCommentedFilmsTemplate} from "./components/MostCommentedFilms.js";
import {createFooterStatisticsTemplate} from "./components/FooterStatistics.js";
import {createFilmDetailsPopupTemplate} from "./components/FilmDetailsPopup.js";
import {generateNavigation} from "./mock/Navigation";
import {generateFilmCards} from "./mock/filmCard";
import {generateFilmCard} from "./mock/filmCard";

export const ALL_FILMS_COUNT = 24;
const MOST_COMMENTED_FILMS_COUNT = 2;
const TOP_RATED_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 8;
const SHOWING_FILMS_COUNT_BY_BUTTON = 8;


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteBodyElement = document.querySelector(`body`);

const navigation = generateNavigation();
const filmCards = generateFilmCards(ALL_FILMS_COUNT);
const popup = generateFilmCard();


render(siteHeaderElement, createUserRatingTemplate(), `beforeend`);

render(siteMainElement, createNavigationTemplate(navigation), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);

const siteFilmsDesk = siteMainElement.querySelector(`.films`);

render(siteFilmsDesk, createAllFilmsTemplate(), `beforeend`);

const AllFilmsList = siteFilmsDesk.querySelector(`.films-list`);
const AllFilmsContainer = AllFilmsList.querySelector(`.films-list__container`);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

filmCards.slice(1, showingFilmsCount).forEach((filmCard) => render(AllFilmsContainer, createFilmCardTemplate(filmCard), `beforeend`))

render(AllFilmsList, createShowMoreButtonTemplate(), `beforeend`);

render(siteFilmsDesk, createTopRatedFilmsTemplate(), `beforeend`);
render(siteFilmsDesk, createMostCommentedFilmsTemplate(), `beforeend`);

const MostCommentedFilmsListContainer = siteFilmsDesk.querySelector(`.films-list--extra:last-of-type .films-list__container`);
for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
  render(MostCommentedFilmsListContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

const TopRatedFilmsListContainer = siteFilmsDesk.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
  render(TopRatedFilmsListContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatistics, createFooterStatisticsTemplate(), `beforeend`);

//render(siteBodyElement, createFilmDetailsPopupTemplate(popup), `beforeend`);

const showMoreButton = AllFilmsList.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  filmCards.slice(prevFilmsCount, showingFilmsCount)
    .forEach((filmCard) => render(AllFilmsContainer, createFilmCardTemplate(filmCard), `beforeend`));
  if (showingFilmsCount >= filmCards.length) {
    showMoreButton.remove();
  }

});


