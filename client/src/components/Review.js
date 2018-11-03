import React from 'react';
import styled from 'styled-components';
import ReviewHeader from './ReviewHeader.js';

const HelpfulData = styled.span`
  background-color: #ededed;
  margin: 0.5em;
  padding: 0.1em;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const Review = ({
  id,
  body,
  recommend,
  helpful,
  unhelpful,
  incrementValue,
  ...others
}) => (
  <>
    <ReviewHeader {...others} />
    <p>{body}</p>
    <p>
      <strong>{recommend ? '☑ Yes' : '☒ No'}</strong>, I
      {recommend ? ' recommend this product' : ' do not recommend this product'}
    </p>
    <p>
      Helpful?
      <HelpfulData onClick={() => incrementValue('helpful', id)}>
        Yes: {helpful}
      </HelpfulData>
      <HelpfulData onClick={() => incrementValue('unhelpful', id)}>
        {' '}
        No: {unhelpful}{' '}
      </HelpfulData>
    </p>
    <hr />
  </>
);

export default Review;
