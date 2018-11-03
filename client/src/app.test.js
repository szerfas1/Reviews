import { expect } from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import App from './app.js';

const testData = [
  {
    id: 94,
    product_id: 11,
    rating: 5,
    reviewer: 'Carolanne_Reynolds32',
    title: 'Ad voluptate ut asperiores quisquam.',
    body:
      'Enim perferendis beatae qui dolorem ipsum perspiciatis possimus. Aliquam ut quasi debitis asperiores qui nisi. Quidem ipsa aut qui aut ut esse autem consequatur. Quia dolore alias alias minima illo maiores. Odit temporibus illo harum.',
    recommend: true,
    helpful: 10,
    unhelpful: 6,
    posting_date: '2015-09-04T04:00:00.000Z',
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
    posting_date: '2016-09-04T04:00:00.000Z',
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
    helpful: 28,
    unhelpful: 11,
    posting_date: '2017-09-04T04:00:00.000Z',
  },
  {
    id: 97,
    product_id: 11,
    rating: 2,
    reviewer: 'Humphrey Ford',
    title: 'Eaque nihil ut unde molestiae commodi eos.',
    body:
      'Labore ut aut asperiores veniam cum maxime quaerat. Deleniti repudiandae porro id dolores error. Quisquam tempora eaque libero quia voluptas autem. Aut corrupti fugit placeat vero. Cum esse quos a harum vero animi. Aperiam est consequuntur ut quia. Dolor harum vitae aliquid.',
    recommend: true,
    helpful: 6,
    unhelpful: 13,
    posting_date: '2018-09-04T04:00:00.000Z',
  },
].sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date));

describe('Results component', () => {
  fetch.mockResponse(JSON.stringify(testData));

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

  it('should render the date', () => {
    w.find('ReviewHeader__PostedDate').forEach((node, i) => {
      const currectDate = new Date(testData[i].posting_date);
      expect(node.text()).to.include(currectDate.getFullYear());
      expect(node.text()).to.include(currectDate.getDate());
    });
  });
});

describe('Sorting the reviews', () => {
  fetch.mockResponse(JSON.stringify(testData));
  const w = mount(<App />);

  it('should be able to sort the reviews from highest to lowest rating', () => {
    w.update();
    w.find('SortSelector__SortPicker')
      .at(0)
      .simulate('change', { target: { value: 'ratingHighToLow' } });

    const sortedData = testData.sort((a, b) => b.rating - a.rating);
    w.find('ReviewHeader').forEach((node, i) => {
      const rendered = node
        .find('span')
        .first()
        .html();

      expect(rendered).to.include(`${sortedData[i].rating} out of 5 stars`);
    });
  });

  it('should be able to sort the reviews from lowest to highest rating', () => {
    const sortedData = testData.sort((a, b) => a.rating - b.rating);

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
    const sortedData = testData.sort((a, b) => b.helpful - a.helpful);

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

  it('should be able to sort the reviews by date', () => {
    const sortedData = testData.sort(
      (a, b) => new Date(b.posting_date) - new Date(a.posting_date),
    );

    w.find('SortSelector__SortPicker')
      .at(0)
      .simulate('change', { target: { value: 'mostRecent' } });

    w.find('ReviewHeader').forEach((node, i) => {
      const rendered = node
        .find('span')
        .first()
        .html();

      expect(rendered).to.include(`${sortedData[i].rating} out of 5 stars`);
    });
  });
});

describe('Updating the helpfulness data', () => {
  fetch.mockResponse(JSON.stringify(testData));
  const w = mount(<App />);

  it('should be able to increment the helpfulness data', () => {
    w.update();
    const helpfulnessNode = w.find('Review__HelpfulData').first();
    const helpfulStr = helpfulnessNode.text();
    const helpfulNum = +helpfulStr.match(/\d/g).join('');

    helpfulnessNode.simulate('click');

    expect(
      +helpfulnessNode
        .text()
        .match(/\d/g)
        .join(''),
    ).to.equal(helpfulNum + 1);
  });

  it('should be able to increment the unhelpfulness data', () => {
    const helpfulnessNode = w.find('Review__HelpfulData').at(1);
    const unhelpfulStr = helpfulnessNode.text();
    const unhelpfulNum = +unhelpfulStr.match(/\d/g).join('');

    helpfulnessNode.simulate('click');

    expect(
      +helpfulnessNode
        .text()
        .match(/\d/g)
        .join(''),
    ).to.equal(unhelpfulNum + 1);
  });

  it('should throw an error if an incorrect value is incremented', () => {
    const incrementingBadValue = () => w.instance().incrementValue('bob');
    expect(incrementingBadValue).to.throw();
  });
});
