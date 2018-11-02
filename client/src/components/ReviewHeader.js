import React from 'react';
import styled from 'styled-components';

const Reviewer = styled.div`
  font-weight: bold;
  display: inline;
`;

const ReviewTitle = styled.h3`
  margin-top: 0;
`;

const Star = styled.span`
  color: ${status => (status.filled ? '#bd5b0d' : 'grey')};
  font-size: 1.3em;
`;

const ReviewHeader = ({ reviewer, title, rating }) => {
  const stars = [1, 2, 3, 4, 5].map(el => (
    <Star key={el} filled={el <= rating}>
      ★
    </Star>
  ));

  return (
    <>
      {stars}
      <Reviewer>{reviewer}</Reviewer>
      <ReviewTitle>{title}</ReviewTitle>
    </>
  );
};

export default ReviewHeader;
