const navigationNames = [`History`, `Favorites`, `Watchlist`];

const generateNavigation = () => {
  return navigationNames.map((it) =>{
    return {
      name: it,
      count: Math.floor(Math.random() * 50),
    };
  });
};

export {generateNavigation};
