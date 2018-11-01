import React from 'react';
import styled from 'styled-components';

const ReviewOverview = props => {
  const { ratings } = props;

  const totalRatings = ratings.reduce((cur, acc) => acc + cur, 0);

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
    margin-left: calc(-1 * (180px + 1.65em));
    width: ${styleProps => (180 / totalRatings) * styleProps.rating}px;
    height: 10px;
  `;
  const NumericalRating = styled.span`
    padding-left: 1em;
  `;

  return (
    <>
      <Header>Rating Snapshot</Header>
      {ratings.map((rating, i) => (
        <div key={i}>
          {i + 1}
          ★: <Bar />
          <NumericalRating>{rating}</NumericalRating>
          <FilledBar rating={rating} />
        </div>
      ))}
    </>
  );
};

export default ReviewOverview;
