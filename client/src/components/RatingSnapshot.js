import React from 'react';
import styled from 'styled-components';

const RatingSnapshot = props => {
  const { ratings } = props;

  const totalRatings = ratings.reduce((acc, cur) => acc + cur, 0);

  const Container = styled.div`
    float: left;
  `;

  const Header = styled.p`
    margin-bottom: 0;
  `;

  const Bar = styled.span`
    display: inline-block;
    background-color: #c5c5c5;
    width: 180px;
    height: 10px;
  `;
  const FilledBar = styled.span`
    display: inline-block;
    background-color: #bd5b0d;
    margin-left: calc(
      -1 * (198px + ${styleProps => 0.65 * String(styleProps.rating).length}em)
    );
    width: ${styleProps => (180 / totalRatings) * styleProps.rating}px;
    height: 10px;
  `;
  const NumericalRating = styled.span`
    padding-left: 1em;
  `;

  return (
    <Container>
      <Header>Rating Snapshot</Header>
      {ratings.map((rating, i) => (
        <div key={i}>
          {i + 1}
          ★: <Bar />
          <NumericalRating>{rating}</NumericalRating>
          <FilledBar rating={rating} />
        </div>
      ))}
    </Container>
  );
};

export default RatingSnapshot;
