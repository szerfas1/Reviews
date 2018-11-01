import React from 'react';
import styled from 'styled-components';
import Review from './components/Review.js';
import RatingSnapshot from './components/RatingSnapshot.js';
import AverageRating from './components/AverageRating.js';
import SortSelector from './components/SortSelector.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      ratings: [],
      sortDirection: 'mostRecent',
    };
    this.sortByRating = this.sortByRating.bind(this);
  }

  componentDidMount() {
    const url = window.location.href.split('/');
    const productId = url[url.length - 1];

    fetch(`http://localhost:8000/reviews/${productId}`)
      .then(response => response.json())
      .then(json => {
        const initialRatings = Array(5).fill(0);
        const ratings = json.reduce((currentRatings, review) => {
          const newRatings = currentRatings;
          newRatings[review.rating - 1]++;
          return newRatings;
        }, initialRatings);
        this.setState(() => ({ reviews: json, ratings }));
      });
  }

  sortByRating(newSortDirection) {
    console.log(newSortDirection);
    const { reviews } = this.state;
    const action = {
      ratingLowToHigh: () => reviews.sort((a, b) => a.rating > b.rating),
      ratingHighToLow: () => reviews.sort((a, b) => a.rating < b.rating),
      mostHelpful: () => reviews.sort((a, b) => a.helpful < b.helpful),
    };

    const sortedReviews = action[newSortDirection]();

    this.setState(() => ({
      reviews: sortedReviews,
      sortDirection: newSortDirection,
    }));
  }

  render() {
    const { reviews, ratings, sortDirection } = this.state;

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

    return (
      <Main>
        <Title onClick={this.sortByRating}>Reviews</Title>
        <ReviewHeader>
          <RatingSnapshot ratings={ratings} />
          <AverageRating ratings={ratings} />
        </ReviewHeader>
        <SortSelector
          sortDirection={sortDirection}
          handleChange={this.sortByRating}
        />
        {reviews.map(review => (
          <Review key={review.id} {...review} />
        ))}
      </Main>
    );
  }
}

export default App;
