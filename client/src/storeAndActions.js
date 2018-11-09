import createStore from 'unistore';

const BASE_URL = 'http://fec-reviews-dev.us-west-2.elasticbeanstalk.com';
const PRODUCT_ID = window.location.href.split('/')[
  window.location.href.split('/').length - 1
];

const store = createStore({
  reviews: {},
  ratings: [0, 0, 0, 0, 0],
  sortDirection: 'mostRecent',
  updateCounter: 0,
  modifiedKeys: {},
});

const setInitialState = () => {
  const newReviews = {};
  /* global INITIAL_STATE */
  if (typeof INITIAL_STATE !== 'undefined') {
    const { reviews, ratings } = INITIAL_STATE;
    store.setState({ reviews, ratings });
  }
  fetch(`${BASE_URL}/reviews/${PRODUCT_ID}`)
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

const updateDB = payload => {
  fetch(`${BASE_URL}/reviews/${PRODUCT_ID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

const actions = () => ({
  incrementRatings: ({ ratings }) => ({ ratings: ratings.map(el => el + 1) }),

  sortReviewsBy: (state, value) => ({ sortDirection: value }),

  incrementValue: ({ reviews, updateCounter }, targetId, value) => {
    if (!reviews[targetId].modifiedKeys[value]) {
      updateDB({
        reviewId: targetId,
        updatedCol: value,
        newValue: reviews[targetId][value] + 1,
      });
      reviews[targetId].modifiedKeys[value] = true;
      reviews[targetId][value] += 1;
      store.setState({ reviews, updateCounter: updateCounter + 1 });
    }
  },
});
setInitialState();

export { store, actions };
