import React from 'react';
import styled from 'styled-components';
import './app.css';
import Review from './components/review.js';

class App extends React.Component {
  constructor(props) {
    super(props);
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

    const ReviewOverview = styled.div``;

    return (
      <Main>
        <h1>Reviews</h1>
        <ReviewOverview />
        {reviews.map(review => (
          <Review key={review.id} {...review} />
        ))}
      </Main>
    );
  }
}

export default App;
