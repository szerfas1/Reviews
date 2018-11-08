import createStore from 'unistore';
import { Provider, connect } from 'unistore/react';

const store = createStore({
  reviews: [],
  ratings: [0, 0, 0, 0, 0],
  sortDirection: 'mostRecent',
});

const actions = theStore => ({
  incrementRatings: ({ ratings }) => ({ ratings: ratings.map(el => el + 1) }),

  sortReviewsBy: (state, value) => ({ sortDirection: value }),

  deleteReview: ({ reviews }) => ({ reviews: [reviews[1], reviews[0]] }),

  incrementHelpful: ({ reviews }, targetId) => {
    if (reviews.filter(review => review.id === targetId)[0].changed) {
      return;
    }
    const newReviews = reviews.map(review => {
      if (review.id === targetId) {
        review.helpful += 1;
        review.changed = true;
      }
      return review;
    });
    return { reviews: newReviews };
  },

  setInitialState: () => ({
    reviews: INITIAL_STATE.reviews,
    ratings: INITIAL_STATE.ratings,
  }),
});

export { store, actions };
