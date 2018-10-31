// setup file for Enzyme.js
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
global.fetch = require('jest-fetch-mock');

configure({ adapter: new Adapter() });
