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

const ReviewHeader = ({ reviewer, title, rating }, props) => {
  const date = new Date(props.posting_date);
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][date.getMonth()];

  const dateStr = `${month} ${date.getDate()}, ${date.getFullYear()}`;
  const stars = [1, 2, 3, 4, 5].map(el => (
    <Star key={el} filled={el <= rating}>
      ★
    </Star>
  ));

  return (
    <>
      <span title={`${rating} out of 5 stars`}>{stars}</span>
      <Reviewer>{reviewer} </Reviewer>
      <span> {dateStr}</span>
      <ReviewTitle>{title}</ReviewTitle>
    </>
  );
};

export default ReviewHeader;
