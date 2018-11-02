import { expect } from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import App from './app.js';

const testData = [
  {
    id: 94,
    product_id: 11,
    rating: 2,
    reviewer: 'Carolanne_Reynolds32',
    title: 'Ad voluptate ut asperiores quisquam.',
    body:
      'Enim perferendis beatae qui dolorem ipsum perspiciatis possimus. Aliquam ut quasi debitis asperiores qui nisi. Quidem ipsa aut qui aut ut esse autem consequatur. Quia dolore alias alias minima illo maiores. Odit temporibus illo harum.',
    recommend: true,
    helpful: 30,
    unhelpful: 6,
  },
  {
    id: 95,
    product_id: 11,
    rating: 1,
    reviewer: 'Shyanne.Langworth72',
    title:
      'Et incidunt velit ducimus sint suscipit aliquid vitae dolorem cumque.',
    body:
      'Tempora aut fugiat exercitationem. Consequuntur recusandae impedit repellendus libero. Voluptatem beatae aspernatur officiis aliquam aperiam. Provident illum officiis suscipit. Laudantium natus asperiores officiis sequi amet explicabo. Rerum nihil porro beatae. Qui ut eveniet aut libero reiciendis ut.',
    recommend: true,
    helpful: 18,
    unhelpful: 3,
  },
  {
    id: 96,
    product_id: 11,
    rating: 2,
    reviewer: 'Abbigail_Torphy87',
    title: 'Eaque nihil quibusdam ut unde molestiae commodi eos.',
    body:
      'Labore ut nostrum aut asperiores veniam cum maxime quaerat. Deleniti repudiandae porro id dolores error. Quisquam tempora eaque libero quia voluptas autem. Aut corrupti fugit placeat vero. Cum esse quos a harum vero animi. Aperiam est consequuntur ut quia. Dolor harum vitae aliquid.',
    recommend: false,
    helpful: 8,
    unhelpful: 11,
  },
];

describe('Results component', () => {
  fetch.mockResponseOnce(JSON.stringify(testData));

  const w = mount(<App />);
  it('should render "reviews" to the page', () => {
    expect(w.html().toLowerCase()).to.include('reviews');
  });

  it('should render the correct number of stars', () => {
    w.update();
    const renderedStars = w.find('ReviewHeader__Star').filter('[filled=true]')
      .length;
    const targetStarNumber = testData.reduce((acc, cur) => acc + cur.rating, 0);
    expect(renderedStars).to.equal(targetStarNumber);
  });

  it('should render whether the product is recommended', () => {
    expect(w.html().toLowerCase()).to.include('i recommend ');
    expect(w.html().toLowerCase()).to.include('i do not recommend ');
  });

  it('should render the correct number of 1-star ratings', () => {
    const rendered1StarRatings = +w
      .find('RatingSnapshot__NumericalRating')
      .at(0)
      .text();

    const expected1StarRatings = testData.reduce(
      (acc, cur) => (cur.rating === 1 ? acc + 1 : acc),
      0,
    );

    expect(rendered1StarRatings).to.equal(expected1StarRatings);
  });

  it('should render the correct number of 2-star ratings', () => {
    const rendered2StarRatings = +w
      .find('RatingSnapshot__NumericalRating')
      .at(1)
      .text();

    const expected2StarRatings = testData.reduce(
      (acc, cur) => (cur.rating === 2 ? acc + 1 : acc),
      0,
    );

    expect(rendered2StarRatings).to.equal(expected2StarRatings);
  });

  it('should render the correct average rating', () => {
    const sumOfRatings = testData.reduce((acc, cur) => acc + cur.rating, 0);
    const avgRating = sumOfRatings / testData.length;

    expect(w.find('AverageRating__Container').text()).to.include(
      String(avgRating.toPrecision(3)),
    );
  });

  it('should be able to sort the reviews from highest to lowest rating', () => {
    w.find('ReviewHeader').forEach((node, i) => {
      const rendered = node
        .find('span')
        .first()
        .html();

      expect(rendered).to.include(`${testData[i].rating} out of 5 stars`);
    });

    w.find('SortSelector__SortPicker')
      .at(0)
      .simulate('change', { target: { value: 'ratingHighToLow' } });

    const sortedData = testData.sort((a, b) => a.rating < b.rating);
    w.find('ReviewHeader').forEach((node, i) => {
      const rendered = node
        .find('span')
        .first()
        .html();

      expect(rendered).to.include(`${sortedData[i].rating} out of 5 stars`);
    });
  });

  it('should be able to sort the reviews from lowest to highest rating', () => {
    const sortedData = testData.sort((a, b) => a.rating > b.rating);

    w.find('SortSelector__SortPicker')
      .at(0)
      .simulate('change', { target: { value: 'ratingLowToHigh' } });

    w.find('ReviewHeader').forEach((node, i) => {
      const rendered = node
        .find('span')
        .first()
        .html();

      expect(rendered).to.include(`${sortedData[i].rating} out of 5 stars`);
    });
  });

  it('should be able to sort the reviews by helpfulness', () => {
    const sortedData = testData.sort((a, b) => a.helpful > b.helpful);

    w.find('SortSelector__SortPicker')
      .at(0)
      .simulate('change', { target: { value: 'mostHelpful' } });

    w.find('ReviewHeader').forEach((node, i) => {
      const rendered = node
        .find('span')
        .first()
        .html();

      expect(rendered).to.include(`${sortedData[i].rating} out of 5 stars`);
    });
  });
});
