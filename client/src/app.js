import React from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import { actions } from './storeAndActions.js';
import Review from './components/Review.js';
import RatingSnapshot from './components/RatingSnapshot.js';
import AverageRating from './components/AverageRating.js';
import SortSelector from './components/SortSelector.js';

const BASE_URL = 'http://fec-reviews-dev.us-west-2.elasticbeanstalk.com';
const url = window.location.href.split('/');
const PRODUCT_ID = url[url.length - 1];

const Main = styled.div`
  margin: 40px auto;
  max-width: 650px;
  line-height: 1.6;
  font-size: 18px;
  color: #444;
  padding: 0 10px;
`;

const ReviewHeader = styled.div`
  height: 12em;
`;

const Title = styled.h1`
  text-align: center;
`;

const App = ({ reviews }) => (
  <Main>
    <Title>Reviews</Title>
    <ReviewHeader>
      <RatingSnapshot />
      <AverageRating />
    </ReviewHeader>
    <SortSelector />
    <Review />
  </Main>
);

export default connect('reviews')(App);
