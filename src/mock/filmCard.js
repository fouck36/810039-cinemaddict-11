const descriptionItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const posterItems = [
  `the-dance-of-life.jpg`,
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const genreItems = [
  `Musical`,
  `Horror`,
  `Comedy`,
  `Mystery`,
  `Film-Noir`,
  `Drama`,
  `Western`,
  `Cartoon`,
];

const namesItems = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Bill`,
  `Bob`,
  `Arnold`,
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Tim Macoveev`,
  `John Doe`,
];

const counryItems = [
  `USA`,
  `Canada`,
  `France`,
  `UK`,
  `Germany`,
  `Spain`,
];

const titleItems = [
  `The Dance of Life`,
  `A Little Pony Without The Carpet`,
  `Laziness Who Sold Themselves`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`,
  `Made for Each Other`,
];

const emojiItems = [
  `smile`,
  `puke`,
  `sleeping`,
  `angry`,
];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomArrayItems = (array, count) => {
  let clone = array.slice();
  let output = [];
  count = parseInt(count);

  if (isNaN(count)) {
    count = 1;
  } else {
    if (count > array.length) count = array.length;
  }

  for (let i = 0; i < count; i++) {
    output.push(clone.splice(Math.floor(Math.random() * clone.length), 1).join(`,`));

  }

  return output;
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getHours = (time) =>{

  let h = time / 60 ^ 0;
  if (h) {
    let m = time % 60;
    if (m < 10) m = `0` + m;
    return time = h + `h ` + m + `m`;
  } else {
    return time = time + `m`;
  }

};

const getCommentDate = (date) =>{
  let dd = date.getDate();
  if (dd < 10) dd = `0` + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = `0` + mm;

  let yy = date.getFullYear();
  let hh = date.getHours();
  let mins = date.getMinutes();

  return yy + `/` + mm + `/` + dd  + ` ` + hh + `:` + mins ;

};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};


const generateFilmCard = () => {
  const commentsCount = Math.floor(Math.random() * 10);
  return {
    title: getRandomArrayItem(titleItems),
    rating: Math.floor(Math.random() * 100) / 10,
    releaseDate: new Date(),
    duration: getHours(getRandomIntegerNumber(30, 200)),
    genre: getRandomArrayItems(genreItems, 3),
    poster: getRandomArrayItem(posterItems),
    description: getRandomArrayItem(descriptionItems),
    countOfComments: commentsCount,
    ageRating: Math.floor(Math.random() * 20),
    alternativeTitle: getRandomArrayItem(titleItems),
    director: getRandomArrayItem(namesItems),
    writers: getRandomArrayItems(namesItems, 3),
    actors: getRandomArrayItems(namesItems, 3),
    country: getRandomArrayItem(counryItems),
    IsWatchlist: Math.random() > 0.5,
    IsWatched: Math.random() > 0.5,
    IsFavorite: Math.random() > 0.5,
    comment: generateComments(commentsCount),
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

const generateComment = () => {
  return {
    commentDate: getCommentDate(getRandomDate()),
    commentText: getRandomArrayItem(descriptionItems),
    commentAuthor: getRandomArrayItem(namesItems),
    emoji: getRandomArrayItem(emojiItems),
  };
};

const generateComments = (count)=> {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateFilmCard, generateFilmCards};
