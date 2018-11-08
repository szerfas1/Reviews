import React from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import { actions } from '../storeAndActions.js';
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

const Review = ({ reviews, sortDirection, incrementHelpful }) => {
  const sortBy = {
    mostRecent: () =>
      reviews.sort(
        (a, b) => new Date(b.posting_date) - new Date(a.posting_date),
      ),
    ratingLowToHigh: () => reviews.sort((a, b) => a.rating - b.rating),
    ratingHighToLow: () => reviews.sort((a, b) => b.rating - a.rating),
    mostHelpful: () => reviews.sort((a, b) => b.helpful - a.helpful),
  };

  const sortedReviews = sortBy[sortDirection]();
  return sortedReviews.map(
    ({
      id,
      body,
      recommend,
      helpful,
      unhelpful,
      incrementValue,
      changed,
      ...others
    }) => (
      <div key={id}>
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
            onClick={() => incrementHelpful(id)}
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
      </div>
    ),
  );
};

export default connect(
  'reviews,sortDirection',
  actions,
)(Review);
