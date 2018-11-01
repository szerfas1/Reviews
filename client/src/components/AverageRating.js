import React from 'react';
import styled from 'styled-components';

const AverageRating = props => {
  const Container = styled.div`
    float: right;
  `;
  const { ratings } = props;
  const ratingSum = ratings.reduce((acc, cur, i) => acc + cur * i, 0);
  const ratingAve = ratingSum / ratings.reduce((acc, cur) => acc + cur, 0) + 1;

  const Bar = styled.span`
    display: inline-block;
    color: #c5c5c5;
    font-size: 1.5em;
  `;
  const FilledBar = styled.span`
    display: inline-block;
    color: #bd5b0d;
    font-size: 1.5em;
    width: ${(120 / 5) * ratingAve}px;
    height: 1.15em;
    margin-left: calc(-120px - 3 * 0.5em);
    overflow: hidden;
  `;
  return (
    <Container>
      <p>Average Customer Ratings</p>
      <span>Overall</span>
      <Bar>★★★★★</Bar>
      {ratingAve.toPrecision(3)}
      <FilledBar>★★★★★</FilledBar>
    </Container>
  );
};

export default AverageRating;
