import React from 'react';
import styled from 'styled-components';
import ReviewHeader from './ReviewHeader.js';
import colors from '../styles.js';

const HelpfulData = styled.span`
  background-color: ${colors.lightGrey};
  margin: 0.5em;
  padding: 0.1em;
  border-top: 1px solid ${colors.darkGrey};
  border-bottom: 1px solid ${colors.darkGrey};
  cursor: default;
  ${p =>
    p.changed
      ? 'font-weight: bold;'
      : `:hover {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    };`};
`;

const Review = ({
  id,
  body,
  recommend,
  helpful,
  unhelpful,
  incrementValue,
  changed,
  ...others
}) => (
  <>
    <ReviewHeader {...others} />
    <p>{body}</p>
    <p>
      <strong>{recommend ? '☑ Yes' : '☒ No'}</strong>, I
      {!recommend && ' do not'} recommend this product
    </p>
    <p>
      Helpful?
      <HelpfulData
        changed={changed && changed.helpful}
        onClick={() => incrementValue('helpful', id)}
      >
        Yes: {helpful}
      </HelpfulData>
      <HelpfulData
        changed={changed && changed.unhelpful}
        onClick={() => incrementValue('unhelpful', id)}
      >
        No: {unhelpful}
      </HelpfulData>
    </p>
    <hr />
  </>
);

export default Review;
