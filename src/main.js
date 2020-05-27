import UserRatingComponent from "./components/UserRating.js";
import NavigationComponent from "./components/Navigation.js";
import FilterComponent from "./components/Filter.js";
import FilmsBoardComponent from "./components/FilmsBoard.js";
import AllFilmsComponent from "./components/AllFilms.js";
import FilmCardComponent from "./components/FilmCard.js";
import ShowMoreButtonComponent from "./components/ShowMoreButton.js";
import TopRatedFilmsComponent from "./components/TopRatedFilms.js";
import MostCommentedFilmsComponent from "./components/MostCommentedFilms.js";
import FooterStatisticsComponent from "./components/FooterStatistics.js";
import FilmDetailsPopupComponent from "./components/FilmDetailsPopup.js";
import FilmsListContainerComponent from "./components/FilmsListContainer.js";
import {generateNavigation} from "./mock/Navigation";
import {generateFilmCards} from "./mock/filmCard";
import {render, RenderPosition} from "./utils.js";

export const ALL_FILMS_COUNT = 24;
const MOST_COMMENTED_FILMS_COUNT = 2;
const TOP_RATED_FILMS_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 10;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteBodyElement = document.querySelector(`body`);



const renderFilmCard = (filmCardListElement, filmCard) => {
  const filmCardComponent = new FilmCardComponent(filmCard);
  const filmDetailsPopupComponent = new FilmDetailsPopupComponent(filmCard);
  render(filmCardListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);

  const onPopupOpen = (evt) => {
    evt.preventDefault();
    render(siteBodyElement, filmDetailsPopupComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const onPopupClose = (evt) => {
    evt.preventDefault();
    filmDetailsPopupComponent.getElement().remove();
  };

  const popupCover = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  popupCover.addEventListener(`click`, onPopupOpen);

  const popupTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  popupTitle.addEventListener(`click`, onPopupOpen);

  const popupComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  popupComments.addEventListener(`click`, onPopupOpen);

  const PopupCloseButton = filmDetailsPopupComponent.getElement().querySelector(`.film-details__close-btn`);
  PopupCloseButton.addEventListener(`click`, onPopupClose);
};

const renderAllFilmsBoard = (allFilmsComponent, filmCards) => {
  render(allFilmsComponent.getElement(), new FilmsListContainerComponent().getElement(), RenderPosition.BEFOREEND);
  const filmCardListElement = allFilmsComponent.getElement().querySelector(`.films-list__container`);

  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

  filmCards.slice(0, showingFilmsCount).forEach((filmCard) => { renderFilmCard(filmCardListElement, filmCard);
  });

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(allFilmsComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    filmCards.slice(prevFilmsCount, showingFilmsCount)
      .forEach((filmCard) => renderFilmCard(filmCardListElement, filmCard));
    if (showingFilmsCount >= filmCards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }

  });
};

const navigation = generateNavigation();
const filmCards = generateFilmCards(ALL_FILMS_COUNT);
//const popup = generateFilmCard();





render(siteHeaderElement, new UserRatingComponent().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new NavigationComponent(navigation).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsBoardComponent().getElement(), RenderPosition.BEFOREEND);

const siteFilmsDesk = siteMainElement.querySelector(`.films`);

render(siteFilmsDesk, new AllFilmsComponent().getElement(), RenderPosition.BEFOREEND);

//const AllFilmsList = siteFilmsDesk.querySelector(`.films-list`);
//const AllFilmsContainer = AllFilmsList.querySelector(`.films-list__container`);
/* let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

filmCards.slice(1, showingFilmsCount).forEach((filmCard) => render(AllFilmsContainer, createFilmCardTemplate(filmCard), `beforeend`))
*/
//render(AllFilmsList, createShowMoreButtonTemplate(), `beforeend`);

//render(siteFilmsDesk, new TopRatedFilmsComponent(), `beforeend`);
//render(siteFilmsDesk, new MostCommentedFilmsComponent(), `beforeend`);

/*const MostCommentedFilmsListContainer = siteFilmsDesk.querySelector(`.films-list--extra:last-of-type .films-list__container`);
for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
  render(MostCommentedFilmsListContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
}*/

/*const TopRatedFilmsListContainer = siteFilmsDesk.querySelector(`.films-list--extra .films-list__container`);
for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
  render(TopRatedFilmsListContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
}*/

const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);
render(footerStatistics, new FooterStatisticsComponent().getElement(), RenderPosition.BEFOREEND);


const allFilmsComponent = new AllFilmsComponent();
render(siteFilmsDesk, allFilmsComponent.getElement(), RenderPosition.BEFOREEND);
renderAllFilmsBoard(allFilmsComponent, filmCards);
