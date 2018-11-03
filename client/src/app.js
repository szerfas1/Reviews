import React from 'react';
import styled from 'styled-components';
import Review from './components/Review.js';
import RatingSnapshot from './components/RatingSnapshot.js';
import AverageRating from './components/AverageRating.js';
import SortSelector from './components/SortSelector.js';

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

const BASE_URL = 'http://localhost:8000';
const url = window.location.href.split('/');
const PRODUCT_ID = url[url.length - 1];

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
    this.sortByRating = this.sortByRating.bind(this);
    this.incrementValue = this.incrementValue.bind(this);
    App.updateDB = App.updateDB.bind(this);
  }

  componentDidMount() {
    fetch(`${BASE_URL}/reviews/${PRODUCT_ID}`)
      .then(response => response.json())
      .then(json => {
        const initialRatings = Array(5).fill(0);
        const ratings = json.reduce((currentRatings, review) => {
          const newRatings = currentRatings;
          newRatings[review.rating - 1]++;
          return newRatings;
        }, initialRatings);
        const sortedReviews = json.sort(
          (a, b) => new Date(b.posting_date) - new Date(a.posting_date),
        );
        this.setState(() => ({ reviews: sortedReviews, ratings }));
      });
  }

  sortByRating(newSortDirection) {
    const { reviews } = this.state;
    const action = {
      mostRecent: () =>
        reviews.sort(
          (a, b) => new Date(b.posting_date) - new Date(a.posting_date),
        ),
      ratingLowToHigh: () => reviews.sort((a, b) => a.rating - b.rating),
      ratingHighToLow: () => reviews.sort((a, b) => b.rating - a.rating),
      mostHelpful: () => reviews.sort((a, b) => b.helpful - a.helpful),
    };

    const sortedReviews = action[newSortDirection]();

    this.setState(() => ({
      reviews: sortedReviews,
      sortDirection: newSortDirection,
    }));
  }

  incrementValue(valueToIncrement, reviewId) {
    const { reviews } = this.state;
    let newValue;
    const newReviews = reviews.map(review => {
      if (review[valueToIncrement] === undefined) {
        throw new Error('Invalid valueToIncrement');
      }
      if (review.id === reviewId) {
        newValue = ++review[valueToIncrement];
      }
      return review;
    });
    App.updateDB({ reviewId, updatedCol: valueToIncrement, newValue });
    this.setState(() => ({ reviews: newReviews }));
  }

  render() {
    const { reviews, ratings, sortDirection } = this.state;

    return (
      <Main>
        <Title>Reviews</Title>
        <ReviewHeader>
          <RatingSnapshot ratings={ratings} />
          <AverageRating ratings={ratings} />
        </ReviewHeader>
        <SortSelector
          sortDirection={sortDirection}
          handleChange={this.sortByRating}
        />
        {reviews.map(review => (
          <Review
            key={review.id}
            incrementValue={this.incrementValue}
            {...review}
          />
        ))}
      </Main>
    );
  }
}

export default App;
