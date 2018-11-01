import React from 'react';
import styled from 'styled-components';
import Review from './components/Review.js';
import RatingSnapshot from './components/RatingSnapshot.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      ratings: [],
    };
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

  render() {
    const { reviews, ratings } = this.state;

    const Main = styled.div`
      margin: 40px auto;
      max-width: 650px;
      line-height: 1.6;
      font-size: 18px;
      color: #444;
      padding: 0 10px;
    `;

    const Title = styled.h1`
      text-align: center;
    `;

    return (
      <Main>
        <Title>Reviews</Title>
        <RatingSnapshot ratings={ratings} />
        {reviews.map(review => (
          <Review key={review.id} {...review} />
        ))}
      </Main>
    );
  }
}

export default App;
