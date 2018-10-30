import React from 'react';
import styled from 'styled-components';
import './app.css';

const Main = styled.div`
  margin: 40px auto;
  max-width: 650px;
  line-height: 1.6;
  font-size: 18px;
  color: #444;
  padding: 0 10px;
`;

const ReviewOverview = styled.div``;
const Review = styled.div``;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/reviews/47')
      .then(response => response.json())
      .then(json => {
        this.setState(() => ({ reviews: json }));
      });
  }

  render() {
    const { reviews } = this.state;
    return (
      <Main>
        <h1>Reviews</h1>
        <ReviewOverview />
        {reviews.map(review => {
          const stars = [];
          for (let i = 0; i < 5; i++) {
            i < review.rating ? stars.push('&#9733;') : stars.push('&#9734;');
          }
          return (
            <Review key={review.id}>
              <h4>{review.reviewer}</h4>
              <h3>{review.title}</h3>
              <p>
                {stars.map(star => (
                  <span dangerouslySetInnerHTML={{ __html: star }} />
                ))}
              </p>
              <p>{review.body}</p>
              <p>
                {review.recommend
                  ? 'Yes, I recommend this product'
                  : 'I do not recommend this product'}
              </p>
              <p>
                Helpful? Yes: {review.helpful} No: {review.unhelpful}
              </p>
              <hr />
            </Review>
          );
        })}
      </Main>
    );
  }
}
export default App;
