const createNavigationMarkup = (name, count) =>{
  return (
    `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const createNavigationTemplate = (navigation) => {
  const navigationMarkup = navigation.map((it) => createNavigationMarkup(it.name, it.count)).join(`\n`);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${navigationMarkup}
      
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

//<a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
//<a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
//<a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">42</span></a>
