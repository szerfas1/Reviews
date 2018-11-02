import React from 'react';
import styled from 'styled-components';

const SortSelector = props => {
  const { sortDirection, handleChange } = props;

  const Container = styled.div`
    float: right;
    padding-left: 50%;
  `;
  const SortPicker = styled.select`
    background-color: white;
    text-align-last: right;
    width: ${sortDirection.length - 1.5}em;
    border: none;
    font-size: 1em;
  `;

  return (
    <Container>
      <span>Sort By:</span>
      <SortPicker
        value={sortDirection}
        onChange={e => handleChange(e.target.value)}
      >
        <option value="mostRecent">Most Recent</option>
        <option value="ratingHighToLow">Highest to Lowest Rating</option>
        <option value="ratingLowToHigh">Lowest to Highest Rating</option>
        <option value="mostHelpful">Most Helpful</option>
      </SortPicker>
    </Container>
  );
};

export default SortSelector;
