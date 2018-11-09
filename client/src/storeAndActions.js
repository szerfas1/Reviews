import createStore from 'unistore';

const store = createStore({
  reviews: {},
  ratings: [0, 0, 0, 0, 0],
  sortDirection: 'mostRecent',
  updateCounter: 0,
  modifiedKeys: {},
});

const actions = () => ({
  incrementRatings: ({ ratings }) => ({ ratings: ratings.map(el => el + 1) }),

  sortReviewsBy: (state, value) => ({ sortDirection: value }),

  incrementValue: ({ reviews, updateCounter }, targetId, value) => {
    if (!reviews[targetId].modifiedKeys[value]) {
      const newReviews = reviews;
      newReviews[targetId].modifiedKeys[value] = true;
      newReviews[targetId][value] += 1;
      return {
        reviews: newReviews,
        updateCounter: updateCounter + 1,
      };
    }
    return {};
  },
});

const setInitialState = () => {
  const newReviews = {};

  /* global INITIAL_STATE */
  if (INITIAL_STATE) {
    store.setState({
      reviews: INITIAL_STATE.reviews,
      ratings: INITIAL_STATE.ratings,
    });
  }
  fetch(
    `http://fec-reviews-dev.us-west-2.elasticbeanstalk.com/reviews/${
      window.location.href.split('/')[
        window.location.href.split('/').length - 1
      ]
    }`,
  )
    .then(response => response.json())
    .then(json => {
      const ratings = json.reduce((currentRatings, review) => {
        const newRatings = currentRatings;
        newRatings[review.rating - 1]++;
        return newRatings;
      }, Array(5).fill(0));

      json.forEach(review => {
        newReviews[review.id] = review;
        newReviews[review.id].modifiedKeys = {};
      });
      store.setState({ reviews: newReviews, ratings });
    });
};

setInitialState();

export { store, actions };
