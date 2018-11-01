import React from 'react';
import styled from 'styled-components';
import Review from './components/Review.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = { reviews: [] };
  }

  componentDidMount() {
    const url = window.location.href.split('/');
    const productId = url[url.length - 1];

    fetch(`http://localhost:8000/reviews/${productId}`)
      .then(response => response.json())
      .then(json => this.setState(() => ({ reviews: json })));
  }

  render() {
    const { reviews } = this.state;

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
    const ReviewOverview = styled.div``;

    return (
      <Main>
        <Title>Reviews</Title>
        <ReviewOverview />
        {reviews.map(review => (
          <Review key={review.id} {...review} />
        ))}
      </Main>
    );
  }
}

export default App;
