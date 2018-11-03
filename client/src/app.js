import React from 'react';
import styled from 'styled-components';
import Review from './components/Review.js';
import RatingSnapshot from './components/RatingSnapshot.js';
import AverageRating from './components/AverageRating.js';
import SortSelector from './components/SortSelector.js';

const BASE_URL = 'http://localhost:3002';
const url = window.location.href.split('/');
const PRODUCT_ID = url[url.length - 1];

const Main = styled.div`
  margin: 40px auto;
  max-width: 650px;
  line-height: 1.6;
  font-size: 18px;
  color: #444;
  padding: 0 10px;
`;

const ReviewHeader = styled.div`
  height: 12em;
`;

const Title = styled.h1`
  text-align: center;
`;

class App extends React.Component {
  static updateDB(payload) {
    fetch(`${BASE_URL}/reviews/${PRODUCT_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  constructor() {
    super();
    this.state = {
      reviews: [],
      ratings: [],
      sortDirection: 'mostRecent',
    };
    this.sortReviewsBy = this.sortReviewsBy.bind(this);
    this.incrementValue = this.incrementValue.bind(this);
  }

  componentDidMount() {
    fetch(`${BASE_URL}/reviews/${PRODUCT_ID}`)
      .then(response => response.json())
      .then(json => {
        const ratings = json.reduce((currentRatings, review) => {
          const newRatings = currentRatings;
          newRatings[review.rating - 1]++;
          return newRatings;
        }, Array(5).fill(0));
        const sortedReviews = json.sort(
          (a, b) => new Date(b.posting_date) - new Date(a.posting_date),
        );
        this.setState(() => ({ reviews: sortedReviews, ratings }));
      });
  }

  sortReviewsBy(newSortDirection) {
    const { reviews } = this.state;
    const sortBy = {
      mostRecent: () =>
        reviews.sort(
          (a, b) => new Date(b.posting_date) - new Date(a.posting_date),
        ),
      ratingLowToHigh: () => reviews.sort((a, b) => a.rating - b.rating),
      ratingHighToLow: () => reviews.sort((a, b) => b.rating - a.rating),
      mostHelpful: () => reviews.sort((a, b) => b.helpful - a.helpful),
    };

    const sortedReviews = sortBy[newSortDirection]();

    this.setState(() => ({
      reviews: sortedReviews,
      sortDirection: newSortDirection,
    }));
  }

  incrementValue(value, reviewId) {
    const { reviews } = this.state;

    let newValue;
    const newReviews = reviews.map(review => {
      if (review[value] === undefined) {
        throw new Error('Invalid value');
      }
      if (
        review.id === reviewId &&
        (!review.changed || !review.changed[value])
      ) {
        newValue = ++review[value];
        review.changed
          ? (review.changed[value] = true)
          : (review.changed = { [value]: true });
      }
      return review;
    });
    App.updateDB({ reviewId, updatedCol: value, newValue });
    this.setState(() => ({ reviews: newReviews }));
  }

  render() {
    const { reviews, ratings, sortDirection } = this.state;

    return reviews.length > 0 ? (
      <Main>
        <Title>Reviews</Title>
        <ReviewHeader>
          <RatingSnapshot ratings={ratings} />
          <AverageRating ratings={ratings} />
        </ReviewHeader>
        <SortSelector
          sortDirection={sortDirection}
          handleChange={this.sortReviewsBy}
        />
        {reviews.map(review => (
          <Review
            key={review.id}
            incrementValue={this.incrementValue}
            {...review}
          />
        ))}
      </Main>
    ) : (
      <div>Loading reviews . . .</div>
    );
  }
}

export default App;
