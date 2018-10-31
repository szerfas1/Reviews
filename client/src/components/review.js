import React from 'react';
import ReviewHeader from './reviewHeader.js';

const Review = props => {
  const { body, recommend, helpful, unhelpful, ...others } = props;

  return (
    <>
      <ReviewHeader {...others} />
      <p>{body}</p>
      <p>
        {recommend
          ? '☑ Yes, I recommend this product'
          : '☒ I do not recommend this product'}
      </p>
      <p>
        Helpful? Yes: {helpful} No: {unhelpful}
      </p>
      <hr />
    </>
  );
};

export default Review;
