import React from 'react';

const ReviewHeader = props => {
  const { reviewer, title, rating } = props;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    let star;
    i < rating ? (star = '★') : (star = '☆');
    stars.push(<span key={i}> {star} </span>);
  }

  return (
    <>
      <h4>{reviewer}</h4>
      <h3>{title}</h3>
      <p>{stars}</p>
    </>
  );
};

export default ReviewHeader;
